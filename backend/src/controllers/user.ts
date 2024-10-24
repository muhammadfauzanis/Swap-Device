import {
  createUser,
  findUserByEmail,
  findUserByPhoneNumber,
  updateUserData,
  validateVerificationToken,
} from '../models/Users';
import response from '../response';
import express from 'express';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie';
import { sendVerificationEmail } from '../helper/sentEmail';

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

    if (userEmail || userPhoneNumber) {
      // Check if user has already register before but not verified allow them to click register again and just send verifcode
      if (userEmail?.isVerified === false) {
        const userId = userEmail.user_id;
        const verificationToken = Math.floor(
          100000 + Math.random() * 900000
        ).toString();

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
      return response(400, null, 'User already exist', res);
    }

    // validated password and repassword are same or not
    if (password !== repassword) {
      return response(400, null, `Password doesn't match`, res);
    }

    // encrypt password with bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

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

    generateTokenAndSetCookie(userData.user_id, res);

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
    const { verificationToken } = req.body;

    const user = await validateVerificationToken(verificationToken);

    if (user?.isVerified === true) {
      return response(400, null, 'Account has already verified', res);
    }

    if (!user) {
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
      return response(400, null, 'Invalid email and password.', res);
    }

    // Generate token for user
    const token = generateTokenAndSetCookie(user?.user_id, res);

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
