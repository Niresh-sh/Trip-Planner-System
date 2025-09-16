import {getTripById, getDestinations,createTrip} from '../Controller/TripController.js';
const router = express.Router();

import express from 'express';


router.get('/getdest', getDestinations);
router.post('/createtrip',createTrip);
router.get('/getrip/:id',getTripById);

export default router;