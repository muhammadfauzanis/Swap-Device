import express from 'express';
import { signupUser } from '../controllers/user';
import { body } from 'express-validator';

const router = express.Router();

router.post(
  '/signup',
  [
    body('email').isEmail().withMessage('Email tidak valid'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password minimal 8 karakter'),
  ],
  signupUser
);

export default router;
