import express from "express";
import getDashboardStats, {getTopDestinations} from "../Controller/DashboardController.js";

const router = express.Router();

router.get("/dashboard", getDashboardStats);
router.get("/top-destinations", getTopDestinations);

// router.get("/recent-bookings", getRecentBookings);
// router.delete("/deletebooking", deleteBooking)

export default router;
