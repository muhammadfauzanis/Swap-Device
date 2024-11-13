import {
  createUser,
  findResetPasswordTokenUser,
  findUserByEmail,
  findUserById,
  findUserByPhoneNumber,
  updatePassword,
  updateResetPasswordToken,
  updateUser,
  updateUserData,
  validateVerificationToken,
} from '../models/Users';
import response from '../response';
import express from 'express';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie';
import {
  sendResetPasswordLink,
  sendVerificationEmail,
} from '../helper/sentEmail';
import crypto from 'crypto';
import { authorizationUrl, oauth2Client } from '../utils/loginWithGoogle';
import { google } from 'googleapis';

export const signupUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { name, email, phoneNumber, password, repassword } = req.body;

    if (!name || !email || !phoneNumber || !password || !repassword) {
      return response(400, null, 'All fields are required', res);
    }

    // Get errors from request body (check valid email and password length)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessage = errors
        .array()
        .map((error) => error.msg)
        .join(' & ');
      return response(400, null, errorMessage, res);
    }

    // check user was exist or not
    const userEmail = await findUserByEmail(email);
    const userPhoneNumber = await findUserByPhoneNumber(phoneNumber);

    if (userEmail) {
      // Check if user has already register before but not verified allow them to click register again and just send verifcode
      if (userEmail?.isVerified === false) {
        const userId = userEmail.user_id;
        const verificationToken = Math.floor(100000 + Math.random() * 900000);

        const verificationTokenExpired = new Date(Date.now() + 5 * 60 * 1000);

        sendVerificationEmail(email, verificationToken);

        const userData = await updateUserData(
          userId,
          false, // isVerified
          verificationToken,
          verificationTokenExpired
        );

        return response(200, userData, 'Verification code has been sent', res);
      }

      // if user has existed and verified
      return response(400, null, 'User already exist, please login', res);
    }

    if (userPhoneNumber) {
      return response(
        400,
        null,
        'Your phone number is registered on another account.',
        res
      );
    }

    // validated password and repassword are same or not
    if (password !== repassword) {
      return response(400, null, `Password doesn't match`, res);
    }

    // encrypt password with bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const verificationToken = Math.floor(100000 + Math.random() * 900000);

    const verificationTokenExpired = new Date(Date.now() + 5 * 60 * 1000);

    sendVerificationEmail(email, verificationToken);

    // sent data to database
    const userData = await createUser({
      name,
      email,
      phone_number: phoneNumber,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpired,
    });

    generateTokenAndSetCookie(userData.user_id, userData.name, res);

    return response(201, userData, 'Sucess create user', res);
  } catch (error) {
    console.log(error);
    return response(500, null, 'error when signup', res);
  }
};

export const verifyUserAccount = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { email, verificationToken } = req.body;

    const user = await findUserByEmail(email);

    if (user?.isVerified === true) {
      return response(400, null, 'Account has already verified', res);
    }

    if (!user) {
      return response(404, null, 'User not found', res);
    }

    if (user.verificationToken !== verificationToken) {
      return response(400, null, 'Incorrect verification code!', res);
    }

    const currentTime = Date.now();
    if (
      user.verificationTokenExpired &&
      user.verificationTokenExpired.getTime() < currentTime
    ) {
      return response(400, null, 'Verification code has expired', res);
    }

    await updateUserData(user.user_id, true, null, null);

    return response(201, true, 'Success verified account', res);
  } catch (error) {
    console.log(error);
    return response(500, null, 'error when verify user account', res);
  }
};

export const loginUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { email, password } = req.body;

    // check all fields are fill or not
    if (!email || !password) {
      return response(400, null, 'Email and password fiedls are required', res);
    }

    // Get errors from request body (email and password)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessage = errors
        .array()
        .map((message) => message.msg)
        .join(' & ');

      return response(400, null, errorMessage, res);
    }

    // check if user has token but login again
    const checkToken = req.cookies.token;
    if (checkToken) {
      return response(400, null, 'You have logged in', res);
    }

    // find user on database
    const user = await findUserByEmail(email);

    // check user account has verified or not
    if (user?.isVerified === false) {
      return response(
        400,
        null,
        `Your account hasn't been verified. Please check your email to verify your account.`,
        res
      );
    }

    // check user exist or not
    if (!user || !user.password) {
      return response(
        404,
        null,
        'User not found, please create an account.',
        res
      );
    }

    // compare password with user password in database
    const isPasswordValid = await bcrypt.compare(password, user?.password);
    if (!isPasswordValid) {
      return response(400, null, 'Invalid email or password.', res);
    }

    // Generate token for user
    const token = generateTokenAndSetCookie(user?.user_id, user.name, res);

    const userData = {
      token,
      userId: user.user_id,
      email: user.email,
    };

    return response(200, userData, 'Login success', res);
  } catch (error) {
    console.log(error);
    return response(500, null, 'Error when user login', res);
  }
};

// Login with google controllers
export const loginWithGoogle = (
  req: express.Request,
  res: express.Response
) => {
  res.redirect(authorizationUrl);
};

// Google callback login
export const callbackLoginWithGoogle = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { code } = req.query;

    const { tokens } = await oauth2Client.getToken(code as string);

    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: 'v2',
    });

    const { data } = await oauth2.userinfo.get();

    if (!data.email) {
      return response(404, data, 'User not found', res);
    }

    const user = await findUserByEmail(data.email);

    let userData;

    if (!user) {
      userData = await createUser({
        name: data.name,
        email: data.email,
        auth_provider: 'GOOGLE',
        isVerified: data.verified_email,
      });
    } else {
      await updateUser(user.user_id, data?.name!);
      userData = user;
    }

    const token = generateTokenAndSetCookie(
      userData.user_id,
      userData.name,
      res
    );

    return res.redirect(`http://localhost:3000/auth-success/?token=${token}`);
  } catch (error) {
    console.log(error);
    return response(500, null, 'Error server when login with google', res);
  }
};

export const logoutUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    res.clearCookie('token');
    return response(200, null, 'Logout successfull', res);
  } catch (error) {
    console.log(error);
    return response(500, null, 'Error when logout user', res);
  }
};

export const getDetailUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const userId = parseInt(req.params.userId);

    if (isNaN(userId)) {
      return response(400, null, 'User id is required', res);
    }

    // check user has token or not
    const token = req?.cookies.token;
    if (!token) {
      return response(
        401,
        null,
        `You don't have session token,please login`,
        res
      );
    }

    const user = await findUserById(userId);

    // check user on database
    if (!user) {
      return response(404, null, 'User not found', res);
    }

    return response(200, user, 'Success retrieved detail user', res);
  } catch (error) {
    console.log(error);
    return response(500, null, 'Error when get detail user', res);
  }
};

export const forgotPassword = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { email } = req.body;

    if (!email) {
      return response(400, null, 'Email is required.', res);
    }

    // get error message from request body (email format)
    const error = validationResult(req);
    if (!error.isEmpty()) {
      const errorMessage = error.array()[0].msg;

      return response(400, null, errorMessage, res);
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return response(400, null, 'User not found', res);
    }

    // Generate reset token
    const resetPasswordToken = crypto.randomBytes(20).toString('hex');
    const resetPasswordTokenExpired = new Date(Date.now() + 5 * 60 * 1000);

    const userTokenData = {
      resetPasswordToken,
      resetPasswordTokenExpired,
    };

    await updateResetPasswordToken(
      user.user_id,
      resetPasswordToken,
      resetPasswordTokenExpired
    );

    const resetPasswordURL = `${process.env.CLIENT_URL}/reset-password/${resetPasswordToken}`;
    sendResetPasswordLink(user.email, resetPasswordURL);

    return response(
      200,
      userTokenData,
      'Reset password link has been sent to your email',
      res
    );
  } catch (error) {
    console.log(error);
    return response(500, null, 'error when user reset password', res);
  }
};

export const resetPassword = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { resetPasswordToken } = req.params;
    const { password, rePassword } = req.body;

    // Get error from req validate password length
    const error = validationResult(req);
    if (!error.isEmpty()) {
      const errorMessage = error.array()[0].msg;

      return response(400, null, errorMessage, res);
    }

    if (!password || !rePassword) {
      return response(400, null, 'All fields are required', res);
    }

    // find user from reset password token
    const user = await findResetPasswordTokenUser(resetPasswordToken);

    if (!user) {
      return response(400, null, 'Invalid link, user not found', res);
    }

    const currentTime = Date.now();
    if (
      user.resetPasswordTokenExpired &&
      user.resetPasswordTokenExpired.getTime() < currentTime
    ) {
      return response(
        410,
        null,
        'Your link had expire, please request a new one',
        res
      );
    }

    if (password !== rePassword) {
      return response(400, null, `Password doesn't match`, res);
    }

    // ecrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await updateResetPasswordToken(user.user_id, null, null);
    await updatePassword(user.user_id, hashedPassword);

    return response(200, user, 'Success reset password', res);
  } catch (error) {
    console.log(error);
    return response(500, null, 'Error when user change password', res);
  }
};
