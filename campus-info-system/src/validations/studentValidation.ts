import Joi from "joi";
import { Request, Response, NextFunction } from "express";

// Define a validation schema for student data
const StudentValidationSchema = Joi.object({
  Student_ID: Joi.number().required().messages({
    "number.base": "Student ID must be a number",
    "any.required": "Student ID is required",
  }),
  StudentStatus: Joi.string().valid("Active", "Inactive", "Graduated", "Dropped").required().messages({
    "any.required": "Student Status is required",
    "string.base": "Student Status must be a string",
    "any.only": "Student Status must be one of the following: Active, Inactive, Graduated, Dropped",
  }),
  YearLevel: Joi.number().min(1).max(6).required().messages({
    "number.base": "Year Level must be a number",
    "any.required": "Year Level is required",
    "number.min": "Year Level must be between 1 and 6",
    "number.max": "Year Level must be between 1 and 6",
  }),
  FirstName: Joi.string().max(50).required().messages({
    "string.max": "First name cannot exceed 50 characters",
    "any.required": "First name is required",
  }),
  LastName: Joi.string().max(50).required().messages({
    "string.max": "Last name cannot exceed 50 characters",
    "any.required": "Last name is required",
  }),
  MiddleName: Joi.string().max(50).optional().messages({
    "string.max": "Middle name cannot exceed 50 characters",
  }),
  Address: Joi.string().max(255).required().messages({
    "string.max": "Address cannot exceed 255 characters",
    "any.required": "Address is required",
  }),
  Email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address",
    "any.required": "Email is required",
  }),
  Phone: Joi.number().required().messages({
    "number.base": "Phone number must be a valid number",
    "any.required": "Phone number is required",
  }),
  DateOfBirth: Joi.date().required().messages({
    "date.base": "Date of Birth must be a valid date",
    "any.required": "Date of Birth is required",
  }),
  PlaceOfBirth: Joi.string().max(100).required().messages({
    "string.max": "Place of Birth cannot exceed 100 characters",
    "any.required": "Place of Birth is required",
  }),
  Sex: Joi.string().valid("Male", "Female", "Other").required().messages({
    "any.required": "Sex is required",
    "string.base": "Sex must be a string",
    "any.only": "Sex must be one of the following: Male, Female, Other",
  }),
  Religion: Joi.string().max(50).required().messages({
    "string.max": "Religion cannot exceed 50 characters",
    "any.required": "Religion is required",
  }),
  Nationality: Joi.string().max(50).required().messages({
    "string.max": "Nationality cannot exceed 50 characters",
    "any.required": "Nationality is required",
  }),
  CivilStatus: Joi.string().valid("Single", "Married", "Divorced", "Widowed").required().messages({
    "any.required": "Civil Status is required",
    "string.base": "Civil Status must be a string",
    "any.only": "Civil Status must be one of the following: Single, Married, Divorced, Widowed",
  }),
  Occupation: Joi.string().max(100).optional().messages({
    "string.max": "Occupation cannot exceed 100 characters",
  }),
  WorkAddress: Joi.string().max(255).optional().messages({
    "string.max": "Work Address cannot exceed 255 characters",
  }),
  Course_ID: Joi.number().required().messages({
    "number.base": "Course ID must be a number",
    "any.required": "Course ID is required",
  }),
  Subject_ID: Joi.number().required().messages({
    "number.base": "Subject ID must be a number",
    "any.required": "Subject ID is required",
  }),
  Enrollment_ID: Joi.number().required().messages({
    "number.base": "Enrollment ID must be a number",
    "any.required": "Enrollment ID is required",
  }),
});

// Helper function to validate student data
export const validateStudentData = (data: any) => {
  return StudentValidationSchema.validate(data, { abortEarly: false });
};

// Middleware to validate student data
export const validateStudentMiddlewareV2 = (req: Request, res: Response, next: NextFunction) => {
  const { error } = validateStudentData(req.body);

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
