import express from "express";
import { getAllBookings, approveBooking, declineBooking, deleteBooking } from "../Controller/AdminBookingController.js";
import  checkAdminModels  from '../Middleware/AuthMiddleware.js'; 

const router = express.Router();

router.get("/",checkAdminModels,  getAllBookings);
router.put("/:id/approve" ,checkAdminModels, approveBooking);
router.put("/:id/decline",  declineBooking);
router.delete("/:id",  deleteBooking);

export default router;
