import express from 'express'
import getRecommendations from '../Controller/RecommendationController.js';

const router = express.Router();

// Use the controller directly — remove the broken inline handler that called `recommendForUser`
router.get("/recommendations/:userId", getRecommendations);

export default router;