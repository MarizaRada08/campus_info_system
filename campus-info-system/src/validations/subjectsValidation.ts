import Joi from "joi";
import { Request, Response, NextFunction } from "express";

// Define a validation schema for subject data
const SubjectValidationSchema = Joi.object({
  Subject_ID: Joi.number().required().messages({
    "number.base": "Subject ID must be a number",
    "any.required": "Subject ID is required",
  }),
  SubjectName: Joi.string().max(100).required().messages({
    "string.max": "Subject Name cannot exceed 100 characters",
    "any.required": "Subject Name is required",
  }),
  SubjectDescription: Joi.string().max(500).optional().messages({
    "string.max": "Subject Description cannot exceed 500 characters",
  }),
  Course_ID: Joi.number().required().messages({
    "number.base": "Course ID must be a number",
    "any.required": "Course ID is required",
  }),
});

// Helper function to validate subject data
export const validateSubjectData = (data: any) => {
  return SubjectValidationSchema.validate(data, { abortEarly: false });
};

// Middleware to validate subject data
export const validateSubjectMiddlewareV2 = (req: Request, res: Response, next: NextFunction) => {
  const { error } = validateSubjectData(req.body);

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
