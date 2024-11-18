import express from 'express';
import { authMiddleware } from '../../middlewares/auth';
import { getDetailUser } from '../../controllers/user/user';

const router = express.Router();

router.get('/user-detail/:userId', authMiddleware, getDetailUser);

export default router;
