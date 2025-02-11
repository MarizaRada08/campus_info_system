import express from "express";
import { DepartmentController } from "../controllers/departmentController";
import { authMiddleware } from "../middleware/authMiddleware";
import { createBaseRoutes } from "./baseRoutes";
import { validateDepartmentMiddlewareV2 } from "../validations/departmentValidation";

// Initialize express Router
const router = express.Router();
// Create instance of DepartmentController to handle route logic
const departmentController = new DepartmentController();

/**
 * @swagger
 * tags:
 *   name: Department
 *   description: Department endpoints
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Department:
 *       type: object
 *       properties:
 *         Department_ID:
 *           type: number
 *           description: Unique identifier for the department
 *           example: "DPT-001"
 *         Department_Name:
 *           type: string
 *           description: Name of the department
 *           example: "Computer Science"
 *         Department_Head:
 *           type: string
 *           description: Head of the department
 *           example: "Dr. Jane Smith"
 *       required:
 *         - Department_ID
 *         - Department_Name
 *         - Department_Head
 *
 *     DepartmentResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: Unique identifier for the department
 *           example: "DPT-001"
 *         Department_Name:
 *           type: string
 *           description: Name of the department
 *           example: "Computer Science"
 *         Department_Head:
 *           type: string
 *           description: Head of the department
 *           example: "Dr. Jane Smith"
 */

/**
 * @swagger
 * /api/department:
 *   post:
 *     summary: Create a new department
 *     tags: [Department]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Department'
 *     responses:
 *       201:
 *         description: Department created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DepartmentResponse'
 *       400:
 *         description: Validation error
 *       409:
 *         description: Department already exists
 * 
 *   get:
 *     summary: Get all departments
 *     tags: [Department]
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
 *         description: List of departments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/DepartmentResponse'
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
 * /api/department/{id}:
 *   get:
 *     summary: Get department by ID
 *     tags: [Department]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Department ID
 *     responses:
 *       200:
 *         description: Department details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DepartmentResponse'
 *       404:
 *         description: Department not found
 *   put:
 *     summary: Update department
 *     tags: [Department]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Department ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Department'
 *     responses:
 *       200:
 *         description: Department updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DepartmentResponse'
 *       404:
 *         description: Department not found
 *   delete:
 *     summary: Delete department
 *     tags: [Department]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Department ID
 *     responses:
 *       204:
 *         description: Department deleted successfully
 *       404:
 *         description: Department not found
 */

// Department Routes:
const apiVersionV1 = "v1";
const apiVersionV2 = "v2";

// v1 - No validation
router.use(`/api/${apiVersionV1}/department`, authMiddleware, createBaseRoutes(departmentController));

// v2 - With validation
router.use(`/api/${apiVersionV2}/department`, authMiddleware, validateDepartmentMiddlewareV2, createBaseRoutes(departmentController));

export default router;