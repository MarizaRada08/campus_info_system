import Joi from "joi";
import { Request, Response, NextFunction } from "express";

// Define a validation schema for schedule data
const scheduleValidationSchema = Joi.object({
  // Schedule ID validation
  Schedule_ID: Joi.number()
    .integer()
    .required()
    .messages({
      "number.base": "Schedule_ID must be a number",
      "any.required": "Schedule_ID is required",
    }),

  // Course ID validation
  Course_ID: Joi.number()
    .integer()
    .required()
    .messages({
      "number.base": "Course_ID must be a number",
      "any.required": "Course_ID is required",
    }),

  // Teacher validation
  Teacher: Joi.string()
    .required()
    .messages({
      "string.base": "Teacher must be a string",
      "any.required": "Teacher is required",
    }),

  // Days validation
  Days: Joi.string()
    .required()
    .messages({
      "string.base": "Days must be a string",
      "any.required": "Days are required",
    }),

  // Class time validation (changed to string)
  Class_time: Joi.string()
    .required()
    .messages({
      "string.base": "Class_time must be a string",
      "any.required": "Class_time is required",
    }),

  // Room validation
  Room: Joi.string()
    .required()
    .messages({
      "string.base": "Room must be a string",
      "any.required": "Room is required",
    }),

  // Lecture validation
  Lecture: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      "number.base": "Lecture hours must be a number",
      "number.positive": "Lecture hours must be a positive number",
      "any.required": "Lecture hours are required",
    }),

  // Laboratory validation
  Laboratory: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      "number.base": "Laboratory hours must be a number",
      "number.positive": "Laboratory hours must be a positive number",
      "any.required": "Laboratory hours are required",
    }),

  // Units validation
  Units: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      "number.base": "Units must be a number",
      "number.positive": "Units must be a positive number",
      "any.required": "Units are required",
    }),
});

// ✅ Helper function to validate schedule data
export const validateScheduleData = (data: any) => {
  return scheduleValidationSchema.validate(data, { abortEarly: false });
};

// ✅ Middleware version for routes
export const validateScheduleMiddlewareV2 = (req: Request, res: Response, next: NextFunction) => {
  const { error } = validateScheduleData(req.body);

  if (error) {
    return res.status(400).json({
      message: "Validation error",
      errors: error.details.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      })),
    });
  }

  next();
};
