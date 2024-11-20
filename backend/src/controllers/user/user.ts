import {
  findUserById,
  findUserByPhoneNumber,
  updateUser,
} from '../../models/Users';
import response from '../../response';
import express from 'express';
import bcrypt from 'bcrypt';

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
    const token =
      req.cookies.token || req.headers['authorization']?.split(' ')[1];
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

export const updateUserData = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const userId = parseInt(req.params.userId);
    const { name, phoneNumber, password, repassword } = req.body;

    if (isNaN(userId)) {
      return response(400, null, 'User id is required', res);
    }

    const token =
      req.cookies.token || req.headers['authorization']?.split(' ')[1];

    if (!token) {
      return response(
        401,
        null,
        `You don't have session token, please login`,
        res
      );
    }

    const user = await findUserById(userId);

    if (!user) {
      return response(404, null, 'User not found', res);
    }

    const updatedData: any = {};

    // if user want to change name
    if (name) updatedData.name = name;

    // if user want to change phone number
    if (phoneNumber) {
      // check if phone number already registered, reject user request for update phone number
      const userPhoneNumber = await findUserByPhoneNumber(phoneNumber);
      if (userPhoneNumber) {
        return response(
          400,
          null,
          'Your phone number is registered on another account.',
          res
        );
      }

      if (user.phone_number === phoneNumber) {
        return response(400, null, 'Your new phone number not different', res);
      }

      // if all checking has completed and success, update user phone number
      updatedData.phone_number = phoneNumber;
    }

    // if user want to change password
    if (password) {
      // check password and repassword user are same or not
      if (password !== repassword) {
        return response(400, null, `Password doesn't match`, res);
      }

      // if success
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      updatedData.password = hashedPassword;
    }

    await updateUser(user.user_id, updatedData);

    return response(200, updatedData, 'Update Data Successfully', res);
  } catch (error) {
    console.log(error);
    return response(500, null, 'Error when update user data', res);
  }
};
