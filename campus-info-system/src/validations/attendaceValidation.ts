import Joi from "joi";
import { Request, Response, NextFunction } from "express";

// Define a validation schema for attendance data
const attendanceValidationSchema = Joi.object({
  Attendance_ID: Joi.number().required().messages({
    "any.required": "Attendance ID is required",
  }),
  Date: Joi.date().required().messages({
    "date.base": "Please provide a valid date",
    "any.required": "Date is required",
  }),
  Status: Joi.string().valid("Present", "Absent", "Late", "Excused").required().messages({
    "any.only": "Status must be either Present, Absent, Late, or Excused",
    "any.required": "Status is required",
  }),
});

// Helper function to validate attendance data
export const validateAttendanceData = (data: any) => {
  return attendanceValidationSchema.validate(data, { abortEarly: false });
};

// Middleware to validate attendance data
export const validateAttendanceMiddlewareV2 = (req: Request, res: Response, next: NextFunction) => {
  const { error } = validateAttendanceData(req.body);

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
