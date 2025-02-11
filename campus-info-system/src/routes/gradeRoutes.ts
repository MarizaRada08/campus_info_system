import express from "express";
import { GradeController } from "../controllers/gradeController";
import { authMiddleware } from "../middleware/authMiddleware";
import { createBaseRoutes } from "./baseRoutes";
import { validateGradeMiddlewareV2 } from "../validations/gradeValidation";

// Initialize express Router
const router = express.Router();
// Create instance of GradeController to handle route logic
const gradeController = new GradeController();

/**
 * @swagger
 * tags:
 *   name: Grades
 *   description: Grade endpoints
 */

/**
 * @swagger
 * /api/grades:
 *   post:
 *     summary: Create a new grade record
 *     tags: [Grades]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Grade_ID:
 *                 type: number
 *               Student_ID:
 *                 type: number
 *               Subj_desc:
 *                 type: string
 *               Units:
 *                 type: number
 *               Credits:
 *                 type: number
 *               Remarks:
 *                 type: string
 *     responses:
 *       201:
 *         description: Grade record created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Grade record created successfully
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *
 *   get:
 *     summary: Get all grade records
 *     tags: [Grades]
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
 *         description: List of grade records
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       Grade_ID:
 *                         type: number
 *                       Student_ID:
 *                         type: number
 *                       Subj_desc:
 *                         type: string
 *                       Units:
 *                         type: number
 *                       Credits:
 *                         type: number
 *                       Remarks:
 *                         type: string
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
 * /api/grades/{id}:
 *   get:
 *     summary: Get grade by ID
 *     tags: [Grades]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: Grade ID
 *     responses:
 *       200:
 *         description: Grade details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Grade_ID:
 *                   type: number
 *                 Student_ID:
 *                   type: number
 *                 Subj_desc:
 *                   type: string
 *                 Units:
 *                   type: number
 *                 Credits:
 *                   type: number
 *                 Remarks:
 *                   type: string
 *       404:
 *         description: Grade not found
 *
 *   put:
 *     summary: Update grade record
 *     tags: [Grades]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: Grade ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Subj_desc:
 *                 type: string
 *               Units:
 *                 type: number
 *               Credits:
 *                 type: number
 *               Remarks:
 *                 type: string
 *     responses:
 *       200:
 *         description: Grade updated successfully
 *       404:
 *         description: Grade not found
 *
 *   delete:
 *     summary: Delete grade record
 *     tags: [Grades]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: Grade ID
 *     responses:
 *       204:
 *         description: Grade deleted successfully
 *       404:
 *         description: Grade not found
 */

// Grade Routes:
const apiVersionV1 = "v1";
const apiVersionV2 = "v2";

// v1 - No validation
router.use(`/api/${apiVersionV1}/grade`, authMiddleware, createBaseRoutes(gradeController));

// v2 - With validation
router.use(`/api/${apiVersionV2}/grade`, authMiddleware, validateGradeMiddlewareV2, createBaseRoutes(gradeController));

export default router;