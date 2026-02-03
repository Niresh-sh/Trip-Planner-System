
import { CreateDestinationController, DeleteDestinationController, getAllDestinationController, GetSingleDestinationController, UpdateDestinationController } from "../Controller/DestinationController.js";
//import { uploadProductImage } from "../Middleware/Multer.js";
import express from "express";
const router = express.Router();

router.post("/create-destination",  CreateDestinationController);
router.get("/get-destination", getAllDestinationController);
router.put("/update-destination/:id", UpdateDestinationController);
router.delete("/delete-destination/:id", DeleteDestinationController);
router.get("/get-destination/:id", GetSingleDestinationController);

export default router;
