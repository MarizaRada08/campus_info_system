import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { createBaseRoutes } from "./baseRoutes";
import { validateCourseMiddlewareV2 } from "../validations/courseValidation";
import { CourseController } from "../controllers/courseController";

// Initialize express Router
const router = express.Router();
const courseController = new CourseController();

/**
 * @swagger
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       required:
 *         - Course_ID
 *         - Course_name
 *         - Credits
 *         - Catalog_no
 *         - Academic_yr
 *       properties:
 *         Course_ID:
 *           type: integer
 *           description: The unique identifier for the course
 *           example: 101
 *         Course_name:
 *           type: string
 *           maxLength: 100
 *           description: The name of the course
 *           example: "Introduction to Computer Science"
 *         Credits:
 *           type: integer
 *           description: The number of credits for the course
 *           example: 3
 *         Catalog_no:
 *           type: string
 *           maxLength: 50
 *           description: The catalog number for the course
 *           example: "CS101"
 *         Academic_yr:
 *           type: integer
 *           description: The academic year for the course
 *           example: 2024
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
/**
 * @swagger
 * /api/courses:
 *   post:
 *     summary: Create a new course
 *     tags: [Course]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       201:
 *         description: Course created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *
 *   get:
 *     summary: Get all courses
 *     tags: [Course]
 *     responses:
 *       200:
 *         description: List of courses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Course'
 *
 * /api/courses/{id}:
 *   get:
 *     summary: Get course by ID
 *     tags: [Course]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Course ID
 *     responses:
 *       200:
 *         description: Course details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       404:
 *         description: Course not found
 *
 *   put:
 *     summary: Update course
 *     tags: [Course]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Course ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       200:
 *         description: Course updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       404:
 *         description: Course not found
 *
 *   delete:
 *     summary: Delete course
 *     tags: [Course]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Course ID
 *     responses:
 *       204:
 *         description: Course deleted successfully
 *       404:
 *         description: Course not found
 */

// Course Routes:

const apiVersionV1 = "v1";
const apiVersionV2 = "v2";

// v1 - No validation
router.use(`/api/${apiVersionV1}/course`, authMiddleware, createBaseRoutes(courseController));

// v2 - With validation
router.use(`/api/${apiVersionV2}/course`, authMiddleware, validateCourseMiddlewareV2, createBaseRoutes(courseController));

export default router;