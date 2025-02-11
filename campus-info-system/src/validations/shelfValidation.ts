import Joi from "joi";
import { Request, Response, NextFunction } from "express";

// Define a validation schema for shelf data
const shelfValidationSchema = Joi.object({
  // Shelf ID validation
  // - Must be a number
  // - Required field
  Shelf_ID: Joi.number().required().messages({
    "number.base": "Shelf ID must be a number",
    "any.required": "Shelf ID is required",
  }),

  // Shelf Name validation
  // - Must be a string
  // - Maximum 100 characters
  // - Required field
  Shelf_Name: Joi.string().max(100).required().messages({
    "string.base": "Shelf Name must be a string",
    "string.max": "Shelf Name cannot exceed 100 characters",
    "any.required": "Shelf Name is required",
  }),

  // Category ID validation
  // - Must be a number
  // - Required field
  Category_ID: Joi.number().required().messages({
    "number.base": "Category ID must be a number",
    "any.required": "Category ID is required",
  }),

  // Location validation
  // - Must be a string
  // - Maximum 200 characters
  // - Required field
  Location: Joi.string().max(200).required().messages({
    "string.base": "Location must be a string",
    "string.max": "Location cannot exceed 200 characters",
    "any.required": "Location is required",
  }),
});

// ✅ Helper function to validate shelf data
export const validateShelfData = (data: any) => {
  return shelfValidationSchema.validate(data, { abortEarly: false });
};

// ✅ Middleware version for routes
export const validateShelfMiddlewareV2 = (req: Request, res: Response, next: NextFunction) => {
  const { error } = validateShelfData(req.body);

  if (error) {
    return res.status(400).json({
      message: "Validation error",
      errors: error.details.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      })),
    });
  }

  next();
};
