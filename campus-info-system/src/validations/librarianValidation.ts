import Joi from "joi";
import { Request, Response, NextFunction } from "express";

// Define a validation schema for librarian data
const librarianValidationSchema = Joi.object({
  // Librarian ID validation
  // - Must be a number
  // - Required field
  Librarian_ID: Joi.number().required().messages({
    "number.base": "Librarian ID must be a number",
    "any.required": "Librarian ID is required",
  }),

  // Name validation
  // - Must be a string
  // - Maximum 100 characters
  // - Required field
  Name: Joi.string().max(100).required().messages({
    "string.base": "Name must be a string",
    "string.max": "Name cannot exceed 100 characters",
    "any.required": "Name is required",
  }),

  // Email validation
  // - Must be a valid email format
  // - Required field
  Email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address",
    "any.required": "Email is required",
  }),

  // Phone number validation
  // - Must be a number
  // - Required field
  Phone_Number: Joi.number().required().messages({
    "number.base": "Phone Number must be a number",
    "any.required": "Phone Number is required",
  }),
});

// ✅ Helper function to validate librarian data
export const validateLibrarianData = (data: any) => {
  return librarianValidationSchema.validate(data, { abortEarly: false });
};

// ✅ Middleware version for routes
export const validateLibrarianMiddlewareV2 = (req: Request, res: Response, next: NextFunction) => {
  const { error } = validateLibrarianData(req.body);

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
