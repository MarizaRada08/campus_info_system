import express from "express";
import { FacultyController } from "../controllers/facultyController";
import { authMiddleware } from "../middleware/authMiddleware";
import { createBaseRoutes } from "./baseRoutes";
import { validateFacultyMiddlewareV2 } from "../validations/facultyValidation";

// Initialize express Router
const router = express.Router();
// Create instance of FacultyController to handle route logic
const facultyController = new FacultyController();

/**
 * @swagger
 * tags:
 *   name: Faculty
 *   description: Faculty management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Faculty:
 *       type: object
 *       properties:
 *         Faculty_ID:
 *           type: number
 *           description: Id of the faculty member
 *           example: "FAC-001"
 *         First_Name:
 *           type: string
 *           description: First name of the faculty member
 *           example: "John"
 *         Last_Name:
 *           type: string
 *           description: Last name of the faculty member
 *           example: "Doe"
 *         Gender:
 *           type: string
 *           enum:
 *             - Male
 *             - Female
 *             - Other
 *           description: Gender of the faculty member
 *           example: "Male"
 *         Age:
 *           type: integer
 *           description: Age of the faculty member
 *           example: 35
 *         Email:
 *           type: string
 *           format: email
 *           description: Email address of the faculty member
 *           example: "john.doe@example.com"
 *         Contact:
 *           type: string
 *           description: Contact number of the faculty member
 *           example: "09171234567"
 *         Faculty_Role:
 *           type: string
 *           description: Role of the faculty member
 *           example: "Professor"
 *         Leave_ID:
 *           type: number
 *           description: Foreign Key to the Leave
 *           example: "LV-001"
 *         Attendance_ID:
 *           type: number
 *           description: Foreign Key to the Attendance
 *           example: "ATT-001"
 *         Student_Grade:
 *           type: string
 *           description: Grade assigned by the faculty member
 *           example: "A"
 *       required:
 *         - Faculty_ID
 *         - First_Name
 *         - Last_Name
 *         - Gender
 *         - Age
 *         - Email
 *         - Contact
 *         - Faculty_Role
 *
 *     FacultyResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the faculty member
 *           example: "FAC-001"
 *         First_Name:
 *           type: string
 *           example: "John"
 *         Last_Name:
 *           type: string
 *           example: "Doe"
 *         Gender:
 *           type: string
 *           example: "Male"
 *         Age:
 *           type: integer
 *           example: 35
 *         Email:
 *           type: string
 *           example: "john.doe@example.com"
 *         Contact:
 *           type: string
 *           example: "09171234567"
 *         Faculty_Role:
 *           type: string
 *           example: "Professor"
 *         Leave_ID:
 *           type: string
 *           example: "LV-001"
 *         Attendance_ID:
 *           type: string
 *           example: "ATT-001"
 *         Student_Grade:
 *           type: string
 *           example: "A"
 */

const apiVersionV1 = "v1";
const apiVersionV2 = "v2";

// v1 - No validation
router.use(`/api/${apiVersionV1}/faculty`, authMiddleware, createBaseRoutes(facultyController));

// v2 - With validation
router.use(`/api/${apiVersionV2}/faculty`, authMiddleware, validateFacultyMiddlewareV2, createBaseRoutes(facultyController));

export default router;
