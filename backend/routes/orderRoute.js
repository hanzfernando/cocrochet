import express from 'express';
import { placeOrder, getOrders, getOrderById, updateOrderStatus, updatePaymentStatus } from '../controllers/orderController.js';
import { authToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authToken, placeOrder);
router.get('/:id', authToken, getOrderById);
router.get('/', authToken, getOrders);

router.put('/:orderId/status', authToken, updateOrderStatus);
router.put('/:orderId/payment', authToken, updatePaymentStatus);

export default router;
