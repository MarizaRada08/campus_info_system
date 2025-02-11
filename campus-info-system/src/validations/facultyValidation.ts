import Joi from "joi";
import { Request, Response, NextFunction } from "express";

// Define a validation schema for faculty data
const facultyValidationSchema = Joi.object({
  Faculty_ID: Joi.number().required().messages({
    "any.required": "Faculty ID is required",
  }),
  First_Name: Joi.string().max(50).required().messages({
    "string.max": "First name cannot exceed 50 characters",
    "any.required": "First name is required",
  }),
  Last_Name: Joi.string().max(50).required().messages({
    "string.max": "Last name cannot exceed 50 characters",
    "any.required": "Last name is required",
  }),
  Gender: Joi.string().valid("Male", "Female", "Other").required().messages({
    "any.only": "Gender must be Male, Female, or Other",
    "any.required": "Gender is required",
  }),
  Age: Joi.number().integer().positive().required().messages({
    "number.base": "Age must be a number",
    "number.integer": "Age must be an integer",
    "number.positive": "Age must be a positive number",
    "any.required": "Age is required",
  }),
  Email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address",
    "any.required": "Email is required",
  }),
  Contact: Joi.string().required().messages({
    "any.required": "Contact is required",
  }),
  Faculty_Role: Joi.string().required().messages({
    "any.required": "Faculty role is required",
  }),
  Department_ID: Joi.number().required().messages({
    "any.required": "Department ID is required",
  }),
  Leave_ID: Joi.number().required().messages({
    "any.required": "Leave ID is required",
  }),
  Attendance_ID: Joi.number().required().messages({
    "any.required": "Attendance ID is required",
  }),
  Student_Grade: Joi.string().required().messages({
    "any.required": "Student Grade is required",
  }),
});

// Helper function to validate faculty data
export const validateFacultyData = (data: any) => {
  return facultyValidationSchema.validate(data, { abortEarly: false });
};

// Middleware for validating faculty data in requests
export const validateFacultyMiddlewareV2 = (req: Request, res: Response, next: NextFunction) => {
  const { error } = validateFacultyData(req.body);

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
