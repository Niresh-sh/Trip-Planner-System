import express from 'express'
import getRecommendations from '../Controller/RecommendationController.js';

const router = express.Router();


router.get("/recommendations/:userId", getRecommendations);

export default router;