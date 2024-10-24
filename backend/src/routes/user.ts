import express from 'express';
import { loginUser, signupUser, verifyUserAccount } from '../controllers/user';
import { body } from 'express-validator';

const router = express.Router();

router.post(
  '/signup',
  [
    body('email').isEmail().withMessage('Email tidak valid'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password minimal 8 karakter'),
    body('phoneNumber')
      .isMobilePhone('id-ID')
      .withMessage('Nomor HP tidak valid'),
  ],
  signupUser
);
router.post('/verify', verifyUserAccount);
router.post(
  '/login',
  body('email').isEmail().withMessage('Email tidak valid'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password minimal 8 karakter'),
  loginUser
);

export default router;
