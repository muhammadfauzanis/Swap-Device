import {
  createUser,
  findUserByEmail,
  findUserByPhoneNumber,
} from '../models/Users';
import response from '../response';
import express from 'express';
import bcrypt from 'bcrypt';

export const signupUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { name, email, phoneNumber, password, repassword } = req.body;

    // check user was exist or not
    const userEmail = await findUserByEmail(email);
    const userPhoneNumber = await findUserByPhoneNumber(phoneNumber);

    if (userEmail || userPhoneNumber) {
      return response(400, 'invalid', 'User already exist', res);
    }

    // validated password and repassword are same or not
    if (password !== repassword) {
      return response(400, 'invalid', `Password doesn't match`, res);
    }

    // encrypt password with bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // sent data to database
    const newUser = {
      name,
      email,
      phone_number: phoneNumber,
      password: hashedPassword,
    };

    await createUser(newUser);

    response(201, newUser, 'Sucess create user', res);
  } catch (error) {
    console.log(error);
    response(500, 'invalid', 'error when signup', res);
  }
};
