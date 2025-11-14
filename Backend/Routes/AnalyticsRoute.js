import express from "express";
import { getRevenueAnalytics } from "../Controller/AnalyticsController.js";

const router = express.Router();

// GET /api/analytics/revenue
router.get("/revenue", getRevenueAnalytics);

export default router;
