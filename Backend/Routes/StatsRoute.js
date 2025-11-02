import express from "express";
import getDashboardStats from "../Controller/DashboardController.js";

const router = express.Router();

router.get("/dashboard", getDashboardStats);

// router.get("/recent-bookings", getRecentBookings);
// router.get("/top-destinations", getTopDestinations)
// router.delete("/deletebooking", deleteBooking)

export default router;
