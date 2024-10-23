import express from 'express';
import { signupUser } from '../controllers/user';
import { body } from 'express-validator';

const router = express.Router();

router.post(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Email tidak valid')
      .notEmpty()
      .withMessage('Email tidak boleh kosong'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password minimal 8 karakter'),
  ],
  signupUser
);

export default router;
