import express from 'express';
import { authMiddleware } from '../../middlewares/auth';
import { getDetailUser, updateUserData } from '../../controllers/user/user';
import { body } from 'express-validator';

const router = express.Router();

router.get('/user-detail/:userId', authMiddleware, getDetailUser);
router.put(
  '/update-user/:userId',
  [
    body('phoneNumber')
      .isMobilePhone('any')
      .withMessage('Nomor HP tidak valid'),
  ],
  updateUserData
);

export default router;
