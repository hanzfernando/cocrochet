import express from 'express';
import { loginUser, signupUser, getUserDetails, changePassword } from '../controllers/userController.js';
import { authToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// General Access
router.post('/login', loginUser);
router.post('/signup', signupUser);
router.get('/profile', authToken, getUserDetails);
router.patch('/change-password', authToken, changePassword);

export default router;