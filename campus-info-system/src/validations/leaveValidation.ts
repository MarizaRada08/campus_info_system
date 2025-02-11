import Joi from "joi";
import { Request, Response, NextFunction } from "express";

/**
 * Leave Validation Schema
 * This version includes full validation for leave data.
 */
const leaveValidationSchema = Joi.object({
  Leave_ID: Joi.number().required().messages({
    "any.required": "Leave ID is required",
  }),

  Leave_Type: Joi.string()
    .valid("Sick", "Vacation", "Emergency", "Other")
    .required()
    .messages({
      "any.only": "Leave type must be Sick, Vacation, Emergency, or Other",
      "any.required": "Leave type is required",
    }),

  Faculty_ID: Joi.number().required().messages({
    "any.required": "Faculty ID is required",
  }),

  Date: Joi.date().iso().required().messages({
    "date.base": "Date must be a valid ISO date",
    "any.required": "Date is required",
  }),

  Status: Joi.string()
    .valid("Approved", "Pending", "Rejected")
    .required()
    .messages({
      "any.only": "Status must be Approved, Pending, or Rejected",
      "any.required": "Status is required",
    }),
});

// ✅ Helper function to validate leave data
export const validateLeaveData = (data: any) => {
  return leaveValidationSchema.validate(data, { abortEarly: false });
};

/**
 * Middleware for validating leave data in requests
 * This version handles validation and error responses.
 */
export const validateLeaveMiddlewareV2 = (req: Request, res: Response, next: NextFunction) => {
  const { error } = validateLeaveData(req.body);

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
export const validateLeaveMiddlewareV1 = (req: Request, res: Response, next: NextFunction) => {
  next();
};
