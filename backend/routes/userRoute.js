import express from 'express';
import { loginUser, signupUser, getUserDetails } from '../controllers/userController.js';
import { authToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// General Access
router.post('/login', loginUser);
router.post('/signup', signupUser);
router.get('/profile', authToken, getUserDetails);

export default router;