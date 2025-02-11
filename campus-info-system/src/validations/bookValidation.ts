import Joi from "joi";
import { Request, Response, NextFunction } from "express";

/**
 * Book Validation Schema
 * This is version 2 with validation
 */
const bookValidationSchema = Joi.object({
  Book_ID: Joi.number().positive().required().messages({
    "number.base": "Book ID must be a number",
    "number.positive": "Book ID must be a positive number",
    "any.required": "Book ID is required",
  }),

  Student_ID: Joi.number().positive().optional().messages({
    "number.base": "Student ID must be a number",
    "number.positive": "Student ID must be a positive number",
  }),

  Title: Joi.string().max(200).required().messages({
    "string.base": "Title must be a string",
    "string.max": "Title cannot exceed 200 characters",
    "any.required": "Title is required",
  }),

  Author: Joi.string().max(100).required().messages({
    "string.base": "Author must be a string",
    "string.max": "Author cannot exceed 100 characters",
    "any.required": "Author is required",
  }),

  Publisher: Joi.string().max(100).optional().messages({
    "string.base": "Publisher must be a string",
    "string.max": "Publisher cannot exceed 100 characters",
  }),

  Year_of_Publication: Joi.date().optional().messages({
    "date.base": "Year of Publication must be a valid date",
  }),

  Available_Copies: Joi.number().integer().min(0).required().messages({
    "number.base": "Available Copies must be a number",
    "number.min": "Available Copies cannot be negative",
    "any.required": "Available Copies is required",
  }),

  Total_Copies: Joi.number().integer().min(0).required().messages({
    "number.base": "Total Copies must be a number",
    "number.min": "Total Copies cannot be negative",
    "any.required": "Total Copies is required",
  }),

  Category_ID: Joi.number().positive().required().messages({
    "number.base": "Category ID must be a number",
    "number.positive": "Category ID must be a positive number",
    "any.required": "Category ID is required",
  }),

  Shelf_ID: Joi.number().positive().required().messages({
    "number.base": "Shelf ID must be a number",
    "number.positive": "Shelf ID must be a positive number",
    "any.required": "Shelf ID is required",
  }),
});

// ✅ Helper function to validate book data
export const validateBookData = (data: any) => {
  return bookValidationSchema.validate(data, { abortEarly: false });
};

/**
 * Middleware for validating book data in requests
 * This is version 2 with validation
 */
export const validateBookMiddlewareV2 = (req: Request, res: Response, next: NextFunction) => {
  const { error } = validateBookData(req.body);

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
export const validateBookMiddlewareV1 = (req: Request, res: Response, next: NextFunction) => {
  next();
};
