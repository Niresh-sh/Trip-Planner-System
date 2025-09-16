import express from 'express';
import { createGuide, getAllGuides, deleteGuide,assignGuideToDestination,updateGuide,getGuideById } from '../Controller/GuideController.js'

const router = express.Router();

router.post('/create', createGuide);
router.get('/all', getAllGuides);
router.delete('/delete/:id', deleteGuide);
router.put('/assign', assignGuideToDestination);
router.put('/update/:id',updateGuide);
router.get('/getbyId/:id',getGuideById);


export default router;
