import Joi from "joi";
import { Request, Response, NextFunction } from "express";

// Define a validation schema for transaction data
const transactionValidationSchema = Joi.object({
  Transaction_ID: Joi.number().required().messages({
    "any.required": "Transaction ID is required",
    "number.base": "Transaction ID must be a number",
  }),
  Student_ID: Joi.number().required().messages({
    "any.required": "Student ID is required",
    "number.base": "Student ID must be a number",
  }),
  Book_ID: Joi.number().required().messages({
    "any.required": "Book ID is required",
    "number.base": "Book ID must be a number",
  }),
  Faculty_ID: Joi.number().required().messages({
    "any.required": "Faculty ID is required",
    "number.base": "Faculty ID must be a number",
  }),
  Borrow_Date: Joi.date().required().messages({
    "any.required": "Borrow date is required",
    "date.base": "Borrow date must be a valid date",
  }),
  Return_Date: Joi.date().required().messages({
    "any.required": "Return date is required",
    "date.base": "Return date must be a valid date",
  }),
  Fine: Joi.number().min(0).required().messages({
    "any.required": "Fine is required",
    "number.base": "Fine must be a number",
    "number.min": "Fine must be greater than or equal to 0",
  }),
});

// Helper function to validate transaction data
export const validateTransactionData = (data: any) => {
  return transactionValidationSchema.validate(data, { abortEarly: false });
};

// Middleware to validate transaction data
export const validateTransactionMiddlewareV2 = (req: Request, res: Response, next: NextFunction) => {
  const { error } = validateTransactionData(req.body);

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
