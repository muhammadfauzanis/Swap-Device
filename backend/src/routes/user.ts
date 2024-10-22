import express from 'express';
import { signupUser } from '../controllers/user';

const router = express.Router();

router.post('/signup', signupUser);

export default router;
