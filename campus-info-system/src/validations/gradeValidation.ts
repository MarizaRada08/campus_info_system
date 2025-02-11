import Joi from "joi";
import { Request, Response, NextFunction } from "express";

/**
 * Grade Validation Schema
 * This is version 2 with validation
 */
const gradeValidationSchema = Joi.object({
  Grade_ID: Joi.number()
    .integer()
    .required()
    .messages({
      "number.base": "Grade_ID must be a number",
      "any.required": "Grade_ID is required",
    }),

  Student_ID: Joi.number()
    .integer()
    .required()
    .messages({
      "number.base": "Student_ID must be a number",
      "any.required": "Student_ID is required",
    }),

  Subj_desc: Joi.string()
    .required()
    .messages({
      "string.base": "Subj_desc must be a string",
      "any.required": "Subject description is required",
    }),

  Units: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      "number.base": "Units must be a number",
      "number.positive": "Units must be a positive number",
      "any.required": "Units are required",
    }),

  Credits: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      "number.base": "Credits must be a number",
      "number.positive": "Credits must be a positive number",
      "any.required": "Credits are required",
    }),

  Remarks: Joi.string().optional().messages({
    "string.base": "Remarks must be a string",
  }),
});

// ✅ Helper function to validate grade data
export const validateGradeData = (data: any) => {
  return gradeValidationSchema.validate(data, { abortEarly: false });
};

/**
 * Middleware for validating grade data in requests
 * This is version 2 with validation
 */
export const validateGradeMiddlewareV2 = (req: Request, res: Response, next: NextFunction) => {
  const { error } = validateGradeData(req.body);

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
export const validateGradeMiddlewareV1 = (req: Request, res: Response, next: NextFunction) => {
  next();
};
