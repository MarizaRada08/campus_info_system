import Joi from "joi";
import { Request, Response, NextFunction } from "express";

// Define a validation schema for enrollment data
const enrollmentValidationSchema = Joi.object({
  Enrollment_ID: Joi.number().required().messages({
    "any.required": "Enrollment_ID is required",
    "number.base": "Enrollment_ID must be a number",
  }),
  Student_ID: Joi.number().required().messages({
    "any.required": "Student_ID is required",
    "number.base": "Student_ID must be a number",
  }),
  Course_ID: Joi.number().required().messages({
    "any.required": "Course_ID is required",
    "number.base": "Course_ID must be a number",
  }),
  EnrollmentDate: Joi.date().required().messages({
    "any.required": "EnrollmentDate is required",
    "date.base": "EnrollmentDate must be a valid date",
  }),
});

// Helper function to validate enrollment data
export const validateEnrollmentData = (data: any) => {
  return enrollmentValidationSchema.validate(data, { abortEarly: false });
};

// Middleware for validating enrollment data in requests
export const validateEnrollmentMiddlewareV2 = (req: Request, res: Response, next: NextFunction) => {
  const { error } = validateEnrollmentData(req.body);

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
