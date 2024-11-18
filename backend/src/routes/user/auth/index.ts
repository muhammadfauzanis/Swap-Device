import express from 'express';
import {
  callbackLoginWithGoogle,
  forgotPassword,
  loginUser,
  loginWithGoogle,
  logoutUser,
  resetPassword,
  signupUser,
  verifyUserAccount,
} from '../../../controllers/user';
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
router.post('/logout', logoutUser);
router.post(
  '/forgot-password',
  body('email').isEmail().withMessage('Email tidak valid'),
  forgotPassword
);
router.post(
  '/reset-password/:resetPasswordToken',
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password minimal 8 karakter'),
  resetPassword
);

// Login with google routes
router.get('/google', loginWithGoogle);
router.get('/google/callback', callbackLoginWithGoogle);

export default router;
