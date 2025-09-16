import { body, validationResult } from "express-validator";

// Validation rules for creating/updating category
 const validateCategory = [
  body("name")
    .trim()
    .notEmpty().withMessage("Category name is required")
    .isString().withMessage("Category name must be a string")
    .isLength({ min: 3 }).withMessage("Category name must be at least 3 characters long"),
];

// Handle validation errors
 const categoryValidationHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      errors: errors.array().map(err => ({ field: err.param, message: err.msg })),
    });
  }
  next();
};

export {
    validateCategory,
    categoryValidationHandler
}