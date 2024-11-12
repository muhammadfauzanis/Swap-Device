import express from 'express';
import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = (
  userId: number,
  name: string,
  res: express.Response
) => {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined in the environment variables');
  }

  const token = jwt.sign({ userId, name }, jwtSecret, {
    expiresIn: '15d',
  });

  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 15 * 24 * 60 * 60 * 1000,
  });

  return token;
};
