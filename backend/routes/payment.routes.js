import express from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { createOrder, verifyPayment } from '../controllers/payment.controller.js'

const router = express.Router();

router.use( authMiddleware );

router.post('/create-order', createOrder);
router.post('/verify', verifyPayment);

export default router;