import {
  createUser,
  findUserByEmail,
  findUserByPhoneNumber,
} from '../models/Users';
import response from '../response';
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

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

    // sent data to database
    const userData = {
      name,
      email,
      phone_number: phoneNumber,
      password: hashedPassword,
    };

    await createUser(userData);

    response(201, userData, 'Sucess create user', res);
  } catch (error) {
    console.log(error);
    response(500, null, 'error when signup', res);
  }
};
