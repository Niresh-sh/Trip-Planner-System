import { CreateCategoryController, 
    getAllCategoryController , 
    UpdateCategoryController, 
    DeleteCategoryController} from "../controller/CategoryController.js";
import express from "express";
import  { categoryValidationHandler, validateCategory } from '../Middleware/CategoryValidator.js';
const router = express.Router();

router.post("/create-category",validateCategory, categoryValidationHandler, CreateCategoryController);
router.get("/get-category", getAllCategoryController);
router.put("/update-category/:id",validateCategory, categoryValidationHandler, UpdateCategoryController);
router.delete("/delete-category/:id", DeleteCategoryController);

export default router;