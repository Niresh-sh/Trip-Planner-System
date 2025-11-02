import categoryModel from "../Models/CategoryModel.js";
import logActivity from "../utils/logActivity.js";

// Create Category
const CreateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: "Name is required" });
    }

    const existing = await categoryModel.findOne({ name: name.trim() });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }

    const category = new categoryModel({ name: name.trim() });
    await category.save();

    // non-blocking activity
    if (req.user?._id) {
      logActivity({
        userId: req.user._id,
        actionType: "create_category",
        text: `Created category: ${category.name}`,
        iconColor: "blue",
      }).catch(() => {});
    }

    return res.status(200).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

// Get All Categories
const getAllCategoryController = async (req, res) => {
  try {
    const categories = await categoryModel.find().sort({ name: 1 });
    return res.status(200).json({
      success: true,
      categories,
    });
  } catch (e) {
    return res.status(400).json({
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

    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name: name?.trim() },
      { new: true }
    );
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    if (req.user?._id) {
      logActivity({
        userId: req.user._id,
        actionType: "update_category",
        text: `Updated category ${id} to ${category.name}`,
        iconColor: "yellow",
      }).catch(() => {});
    }

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (e) {
    return res.status(400).json({
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

    if (req.user?._id) {
      logActivity({
        userId: req.user._id,
        actionType: "delete_category",
        text: `Deleted category ${category.name}`,
        iconColor: "red",
      }).catch(() => {});
    }

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      category,
    });
  } catch (e) {
    return res.status(400).json({
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
