import express from 'express';
import { authToken } from '../middleware/auth.js';
import { addToCart, getCart, deleteCartItem, updateCartItem } from '../controllers/cartController.js';

const router = express.Router();

router.post('/', authToken, addToCart);
router.get('/', authToken, getCart);   
router.put('/:productId', authToken, updateCartItem);
router.delete('/:productId', authToken, deleteCartItem);

export default router;