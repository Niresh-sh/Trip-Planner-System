import { Router } from 'express';
import { getAllActivities, getUserActivities, deleteActivity } from '../Controller/ActivityController.js';

const router = Router();

// Fetch all activities (admin view)
router.get('/', getAllActivities);

// Fetch user-specific activities
router.get('/user/:userId', getUserActivities);

// Delete an activity (admin) - must come AFTER more specific routes
router.delete('/:id', deleteActivity);

export default router;
