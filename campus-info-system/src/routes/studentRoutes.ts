import express from "express";
import { StudentController } from "../controllers/studentController";
import { authMiddleware } from "../middleware/authMiddleware";
import { createBaseRoutes } from "./baseRoutes";
import { validateStudentMiddlewareV2 } from "../validations/studentValidation";

// Initialize express Router
const router = express.Router();
// Create instance of StudentController to handle route logic
const studentController = new StudentController();

/**
 * @swagger
 * tags:
 *   name: Student
 *   description: Student endpoints
 */

/**
 * @swagger
 * /api/student:
 *   post:
 *     summary: Create a new student
 *     tags: [Student]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       201:
 *         description: Student created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StudentResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       409:
 *         description: Email already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email already exists
 *
 *   get:
 *     summary: Get all students
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of students
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/StudentResponse'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     pages:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 */

/**
 * @swagger
 * /api/student/{id}:
 *   get:
 *     summary: Get student by ID
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Student ID
 *     responses:
 *       200:
 *         description: Student details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StudentResponse'
 *       404:
 *         description: Student not found
 *
 *   put:
 *     summary: Update student
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Student ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               FirstName:
 *                 type: string
 *               LastName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Student updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StudentResponse'
 *       404:
 *         description: Student not found
 *
 *   delete:
 *     summary: Delete student
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Student ID
 *     responses:
 *       204:
 *         description: Student deleted successfully
 *       404:
 *         description: Student not found
 */

/**
 * @swagger
 * /api/student/profile:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get student profile
 *     tags: [Student]
 *     responses:
 *       200:
 *         description: Student profile retrieved successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       required:
 *         - FirstName
 *         - LastName
 *         - Email
 *         - DateOfBirth
 *       properties:
 *         Student_ID:
 *           type: integer
 *           description: Unique identifier for the student
 *           example: 12345
 *         StudentStatus:
 *           type: string
 *           description: Status of the student (e.g., active, inactive)
 *           example: "active"
 *         YearLevel:
 *           type: integer
 *           description: Year level of the student (e.g., 1 for Freshman)
 *           example: 2
 *         FirstName:
 *           type: string
 *           maxLength: 50
 *           description: First name of the student
 *           example: "John"
 *         LastName:
 *           type: string
 *           maxLength: 50
 *           description: Last name of the student
 *           example: "Doe"
 *         MiddleName:
 *           type: string
 *           maxLength: 50
 *           description: Middle name of the student
 *           example: "Edward"
 *         Address:
 *           type: string
 *           description: Address of the student
 *           example: "1234 Elm St, Springfield"
 *         Email:
 *           type: string
 *           format: email
 *           description: Email address of the student
 *           example: "john.doe@example.com"
 *         Phone:
 *           type: integer
 *           description: Student's phone number
 *           example: 9876543210
 *         DateOfBirth:
 *           type: string
 *           format: date
 *           description: Date of birth of the student
 *           example: "2000-05-15"
 *         PlaceOfBirth:
 *           type: string
 *           description: Place of birth of the student
 *           example: "Springfield"
 *         Sex:
 *           type: string
 *           description: Sex of the student (Male, Female)
 *           example: "Male"
 *         Religion:
 *           type: string
 *           description: Religion of the student
 *           example: "Christian"
 *         Nationality:
 *           type: string
 *           description: Nationality of the student
 *           example: "American"
 *         CivilStatus:
 *           type: string
 *           description: Civil status of the student (Single, Married)
 *           example: "Single"
 *         Occupation:
 *           type: string
 *           description: Occupation of the student
 *           example: "Student"
 *         WorkAddress:
 *           type: string
 *           description: Address of the student's workplace (if applicable)
 *           example: "XYZ Corp, 5678 Oak Rd, Springfield"
 *         Course_ID:
 *           type: integer
 *           description: The ID of the course the student is enrolled in
 *           example: 101
 *         Subject_ID:
 *           type: integer
 *           description: The ID of the subject the student is enrolled in
 *           example: 301
 *         Enrollment_ID:
 *           type: integer
 *           description: Unique identifier for the student's enrollment record
 *           example: 2024
 *     StudentResponse:
 *       type: object
 *       properties:
 *         Student_ID:
 *           type: integer
 *           description: Unique identifier for the student
 *         FirstName:
 *           type: string
 *         LastName:
 *           type: string
 *         Email:
 *           type: string
 *         DateOfBirth:
 *           type: string
 *           format: date
 *         Enrollment_ID:
 *           type: integer
 *           description: The student's enrollment ID
 *         Course_ID:
 *           type: integer
 *         Subject_ID:
 *           type: integer
 *         StudentStatus:
 *           type: string
 *           description: The current status of the student
 *         YearLevel:
 *           type: integer
 *         Phone:
 *           type: integer
 *         Nationality:
 *           type: string
 *     ValidationError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Error message
 *         details:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *               path:
 *                 type: array
 *                 items:
 *                   type: string
 */



// Student Routes:
const apiVersionV1 = "v1";
const apiVersionV2 = "v2";

// v1 - No validation
router.use(`/api/${apiVersionV1}/student`, authMiddleware, createBaseRoutes(studentController));

// v2 - With validation
router.use(`/api/${apiVersionV2}/student`, authMiddleware, validateStudentMiddlewareV2, createBaseRoutes(studentController));

export default router;