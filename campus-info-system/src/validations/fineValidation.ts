import Joi from "joi";
import { Request, Response, NextFunction } from "express";

/**
 * Fine Validation Schema
 * This is version 2 with validation
 */
const fineValidationSchema = Joi.object({
  Fine_ID: Joi.number().required().messages({
    "number.base": "Fine ID must be a number",
    "any.required": "Fine ID is required",
  }),

  Student_ID: Joi.number().required().messages({
    "number.base": "Student ID must be a number",
    "any.required": "Student ID is required",
  }),

  Transaction_ID: Joi.number().required().messages({
    "number.base": "Transaction ID must be a number",
    "any.required": "Transaction ID is required",
  }),

  Amount: Joi.number().min(0).required().messages({
    "number.base": "Amount must be a number",
    "number.min": "Amount cannot be less than 0",
    "any.required": "Amount is required",
  }),

  Status: Joi.string().max(20).required().messages({
    "string.base": "Status must be a string",
    "string.max": "Status cannot exceed 20 characters",
    "any.required": "Status is required",
  }),
});

// ✅ Helper function to validate fine data
export const validateFineData = (data: any) => {
  return fineValidationSchema.validate(data, { abortEarly: false });
};

/**
 * Middleware for validating fine data in requests
 * This is version 2 with validation
 */
export const validateFineMiddlewareV2 = (req: Request, res: Response, next: NextFunction) => {
  const { error } = validateFineData(req.body);

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
export const validateFineMiddlewareV1 = (req: Request, res: Response, next: NextFunction) => {
  next();
};
