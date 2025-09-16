import categoryModel from "../Models/CategoryModel.js";

// Create Category
const CreateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;

    const existing = await categoryModel.findOne({ name });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }

    const category = new categoryModel({ name });
    await category.save();

    res.status(200).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

// Get All Categories
const getAllCategoryController = async (req, res) => {
  try {
    const categories = await categoryModel.find().sort({ name: 1 });
    res.status(200).json({
      success: true,
      categories,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

// Update Category
const UpdateCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await categoryModel.findByIdAndUpdate(id, { name }, { new: true });
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

// Delete Category
const DeleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await categoryModel.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      category,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

export {
  CreateCategoryController,
  getAllCategoryController,
  UpdateCategoryController,
  DeleteCategoryController,
};
