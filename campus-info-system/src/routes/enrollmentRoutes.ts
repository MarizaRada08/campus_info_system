import express from "express";
import { EnrollmentController } from "../controllers/enrollmentController";
import { authMiddleware } from "../middleware/authMiddleware";
import { createBaseRoutes } from "./baseRoutes";
import { validateEnrollmentMiddlewareV2 } from "../validations/enrollmentValidation";

// Initialize express Router
const router = express.Router();

// Create instance of EnrollmentController to handle route logic
const enrollmentController = new EnrollmentController();

/**
 * @swagger
 * tags:
 *   name: Enrollment
 *   description: Enrollment endpoints
 */

/**
 * @swagger
 * /api/enrollment:
 *   post:
 *     summary: Create a new enrollment
 *     tags: [Enrollment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Enrollment'
 *     responses:
 *       201:
 *         description: Enrollment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EnrollmentResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       409:
 *         description: Conflict error (e.g., Enrollment already exists)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Enrollment already exists
 *   get:
 *     summary: Get all enrollments
 *     tags: [Enrollment]
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
 *         description: List of enrollments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/EnrollmentResponse'
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
 * /api/enrollment/{id}:
 *   get:
 *     summary: Get enrollment by ID
 *     tags: [Enrollment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Enrollment ID
 *     responses:
 *       200:
 *         description: Enrollment details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EnrollmentResponse'
 *       404:
 *         description: Enrollment not found
 *   put:
 *     summary: Update enrollment
 *     tags: [Enrollment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Enrollment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               CourseID:
 *                 type: integer
 *               EnrollmentDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Enrollment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EnrollmentResponse'
 *       404:
 *         description: Enrollment not found
 *   delete:
 *     summary: Delete enrollment
 *     tags: [Enrollment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Enrollment ID
 *     responses:
 *       204:
 *         description: Enrollment deleted successfully
 *       404:
 *         description: Enrollment not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Enrollment:
 *       type: object
 *       properties:
 *         EnrollmentID:
 *           type: integer
 *           example: 10123
 *         StudentID:
 *           type: integer
 *           example: 20234
 *         CourseID:
 *           type: integer
 *           example: 30156
 *         EnrollmentDate:
 *           type: string
 *           format: date
 *           example: "2024-08-15"
 *     EnrollmentResponse:
 *       type: object
 *       properties:
 *         EnrollmentID:
 *           type: integer
 *         StudentID:
 *           type: integer
 *         CourseID:
 *           type: integer
 *         EnrollmentDate:
 *           type: string
 *           format: date
 *     ValidationError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Validation failed for one or more fields"
 */



// Enrollment Routes:

const apiVersionV1 = "v1";
const apiVersionV2 = "v2";

// v1 - No validation
router.use(`/api/${apiVersionV1}/enrollment`, authMiddleware, createBaseRoutes(enrollmentController));

// v2 - With validation
router.use(`/api/${apiVersionV2}/enrollment`, authMiddleware, validateEnrollmentMiddlewareV2, createBaseRoutes(enrollmentController));

export default router;
