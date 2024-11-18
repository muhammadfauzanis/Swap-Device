import express from 'express';
import response from '../response';
import jwt from 'jsonwebtoken';

export const authMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const token =
    req.cookies.token || req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return response(401, null, 'Unauthorized', res);
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    next();
  } catch (error) {
    return response(403, null, 'Token Invalid', res);
  }
};
