import express from 'express';
import { createBooking, cancelBooking, getUserBookings, getBookingById  } from '../Controller/BookingController.js'
import verifyToken from '../Middleware/VerifyToken.js';

const router = express.Router();

router.post("/create-booking",verifyToken, createBooking);
router.delete("/delete-booking/:id",verifyToken, cancelBooking);
router.get("/userbooking",verifyToken, getUserBookings);
router.get("/userbooking/:bookingId", verifyToken, getBookingById)


export default router;