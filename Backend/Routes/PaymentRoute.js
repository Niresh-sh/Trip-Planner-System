import express from 'express';
import { initializePayment, verifyPayment } from '../Controller/PaymentController.js';

const router = express.Router();

// Route to process payment
router.post('/process', initializePayment);
router.post('/verify', verifyPayment);
// router.post('/admin-decline', adminDeclineBooking);
// router.post('/user-cancel', userCancelBooking);

export default router;