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
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie';

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
    console.log(verificationTokenExpired);

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

    response(201, userData, 'Sucess create user', res);
  } catch (error) {
    console.log(error);
    response(500, null, 'error when signup', res);
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
