import Joi from "joi";
import { Request, Response, NextFunction } from "express";

// Define a validation schema for department data
const departmentValidationSchema = Joi.object({
  Department_ID: Joi.number().required().messages({
    "any.required": "Department ID is required",
  }),
  Department_Name: Joi.string().max(100).required().messages({
    "string.max": "Department name cannot exceed 100 characters",
    "any.required": "Department name is required",
  }),
  Department_Head: Joi.string().max(50).required().messages({
    "string.max": "Department head name cannot exceed 50 characters",
    "any.required": "Department head is required",
  }),
});

// Helper function to validate department data
export const validateDepartmentData = (data: any) => {
  return departmentValidationSchema.validate(data, { abortEarly: false });
};

// Middleware for validating department data in requests
export const validateDepartmentMiddlewareV2 = (req: Request, res: Response, next: NextFunction) => {
  const { error } = validateDepartmentData(req.body);

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
