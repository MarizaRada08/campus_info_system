import Joi from "joi";
import { Request, Response, NextFunction } from "express";

// Define a validation schema for category data
const categoryValidationSchema = Joi.object({
  Category_ID: Joi.number().positive().required().messages({
    "number.base": "Category ID must be a number",
    "number.positive": "Category ID must be a positive number",
    "any.required": "Category ID is required",
  }),
  Category_Name: Joi.string().max(100).required().messages({
    "string.base": "Category Name must be a string",
    "string.max": "Category Name cannot exceed 100 characters",
    "any.required": "Category Name is required",
  }),
});

// Helper function to validate category data
export const validateCategoryData = (data: any) => {
  return categoryValidationSchema.validate(data, { abortEarly: false });
};

// Middleware for validating category data in requests
export const validateCategoryMiddlewareV2 = (req: Request, res: Response, next: NextFunction) => {
  const { error } = validateCategoryData(req.body);

  if (error) {
    return res.status(400).json({
      message: "Validation error",
      errors: error.details.map((err) => ({
        field: err.path.join(". "),
        message: err.message,
      })),
    });
  }

  next();
};

// Version 1: No validation
export const validateCategoryMiddlewareV1 = (req: Request, res: Response, next: NextFunction) => {
  next();
};
