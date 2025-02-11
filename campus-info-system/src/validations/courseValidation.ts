import Joi from "joi";
import { Request, Response, NextFunction } from "express";

// Define a validation schema for course data
const courseValidationSchema = Joi.object({
  Course_ID: Joi.number().integer().required().messages({
    "number.base": "Course_ID must be a number",
    "any.required": "Course_ID is required",
  }),
  Course_name: Joi.string().max(100).required().messages({
    "string.max": "Course name cannot exceed 100 characters",
    "any.required": "Course name is required",
  }),
  Credits: Joi.number().integer().positive().required().messages({
    "number.base": "Credits must be a number",
    "number.positive": "Credits must be a positive number",
    "any.required": "Credits are required",
  }),
  Catalog_no: Joi.string().max(50).required().messages({
    "string.max": "Catalog number cannot exceed 50 characters",
    "any.required": "Catalog number is required",
  }),
  Academic_yr: Joi.number().integer().positive().required().messages({
    "number.base": "Academic year must be a number",
    "number.positive": "Academic year must be a positive number",
    "any.required": "Academic year is required",
  }),
});

// Helper function to validate course data
export const validateCourseData = (data: any) => {
  return courseValidationSchema.validate(data, { abortEarly: false });
};

// Middleware for validating course data in requests
export const validateCourseMiddlewareV2 = (req: Request, res: Response, next: NextFunction) => {
  const { error } = validateCourseData(req.body);

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
