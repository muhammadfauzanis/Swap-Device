import { findUserById } from '../../models/Users';
import response from '../../response';
import express from 'express';

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
