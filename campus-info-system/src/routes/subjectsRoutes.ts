import express from "express";
import { SubjectController } from "../controllers/subjectsController";
import { authMiddleware } from "../middleware/authMiddleware";
import { createBaseRoutes } from "./baseRoutes";
import { validateSubjectMiddlewareV2 } from "../validations/subjectsValidation";

// Initialize express Router
const router = express.Router();
// Create instance of SubjectController to handle route logic
const subjectsController = new SubjectController();

/**
 * @swagger
 * tags:
 *   name: Subject
 *   description: Subject endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Subject:
 *       type: object
 *       required:
 *         - subjectID
 *         - subjectName
 *         - subjectDescription
 *         - courseID
 *       properties:
 *         subjectID:
 *           type: integer
 *           description: The unique identifier for the subject
 *         subjectName:
 *           type: string
 *           description: The name of the subject
 *         subjectDescription:
 *           type: string
 *           description: A brief description of the subject
 *         courseID:
 *           type: integer
 *           description: The ID of the course to which the subject belongs
 *     SubjectResponse:
 *       type: object
 *       properties:
 *         subjectID:
 *           type: integer
 *           description: The unique identifier for the subject
 *         subjectName:
 *           type: string
 *           description: The name of the subject
 *         subjectDescription:
 *           type: string
 *           description: A brief description of the subject
 *         courseID:
 *           type: integer
 *           description: The ID of the course to which the subject belongs
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the subject was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the subject was last updated
 *     ValidationError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: A message describing the validation error
 *         details:
 *           type: array
 *           items:
 *             type: string
 *           description: Detailed validation errors (e.g., field-specific errors)
 */

/**
 * @swagger
 * /api/subject:
 *   post:
 *     summary: Create a new subject
 *     tags: [Subject]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subject'
 *     responses:
 *       201:
 *         description: Subject created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubjectResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       409:
 *         description: Subject already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Subject already exists"
 *
 *   get:
 *     summary: Get all subjects
 *     tags: [Subject]
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
 *         description: List of subjects
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/SubjectResponse'
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
 * /api/subject/{id}:
 *   get:
 *     summary: Get subject by ID
 *     tags: [Subject]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Subject ID
 *     responses:
 *       200:
 *         description: Subject details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubjectResponse'
 *       404:
 *         description: Subject not found
 *
 *   put:
 *     summary: Update subject
 *     tags: [Subject]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Subject ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subjectName:
 *                 type: string
 *               subjectDescription:
 *                 type: string
 *               courseID:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Subject updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubjectResponse'
 *       404:
 *         description: Subject not found
 *
 *   delete:
 *     summary: Delete subject
 *     tags: [Subject]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Subject ID
 *     responses:
 *       204:
 *         description: Subject deleted successfully
 *       404:
 *         description: Subject not found
 */


// Subject Routes:
const apiVersionV1 = "v1";
const apiVersionV2 = "v2";

// v1 - No validation
router.use(`/api/${apiVersionV1}/subject`, authMiddleware, createBaseRoutes(subjectsController));

// v2 - With validation
router.use(`/api/${apiVersionV2}/subject`, authMiddleware, validateSubjectMiddlewareV2, createBaseRoutes(subjectsController));

export default router;
