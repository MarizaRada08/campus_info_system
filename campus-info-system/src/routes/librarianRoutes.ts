import express from "express";
import { LibrarianController } from "../controllers/librarianController";
import { authMiddleware } from "../middleware/authMiddleware";
import { createBaseRoutes } from "./baseRoutes";
import { validateLibrarianMiddlewareV2 } from "../validations/librarianValidation";

// Initialize express Router
const router = express.Router();

// Create an instance of LibrarianController to handle route logic
const librarianController = new LibrarianController();

/**
 * @swagger
 * tags:
 *    name: Librarian
 *    description: Librarian endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Librarian:
 *       type: object
 *       properties:
 *         Librarian_ID:
 *           type: number
 *           example: 1
 *         Name:
 *           type: string
 *           example: "John Doe"
 *         Email:
 *           type: string
 *           format: email
 *           example: "johndoe@example.com"
 *         Phone_Number:
 *           type: number
 *           example: 1234567890
 *       required:
 *         - Librarian_ID
 *         - Name
 *         - Email
 *         - Phone_Number
 *     LibrarianResponse:
 *       type: object
 *       properties:
 *         Librarian_ID:
 *           type: number
 *         Name:
 *           type: string
 *         Email:
 *           type: string
 *           format: email
 *         Phone_Number:
 *           type: number
 *     UpdateLibrarianRequest:
 *       type: object
 *       properties:
 *         Name:
 *           type: string
 *         Email:
 *           type: string
 *           format: email
 *         Phone_Number:
 *           type: number
 *     Pagination:
 *       type: object
 *       properties:
 *         currentPage:
 *           type: integer
 *           example: 1
 *         totalPages:
 *           type: integer
 *           example: 5
 *         totalItems:
 *           type: integer
 *           example: 50
 */

/**
 * @swagger
 * /api/librarian:
 *   post:
 *     summary: Create a new librarian
 *     tags: [Librarian]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Librarian'
 *     responses:
 *       201:
 *         description: Librarian created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LibrarianResponse'
 *       400:
 *         description: Validation error
 *       409:
 *         description: Librarian already exists
 *
 *   get:
 *     summary: Retrieve a list of librarians
 *     tags: [Librarian]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number for pagination
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
 *         description: List of librarians with pagination
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/LibrarianResponse'
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 */

/**
 * @swagger
 * /api/librarian/{id}:
 *   get:
 *     summary: Retrieve librarian details by ID
 *     tags: [Librarian]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Librarian ID
 *     responses:
 *       200:
 *         description: Librarian details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LibrarianResponse'
 *       404:
 *         description: Librarian not found
 *
 *   put:
 *     summary: Update a librarian by ID
 *     tags: [Librarian]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Librarian ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateLibrarianRequest'
 *     responses:
 *       200:
 *         description: Librarian updated successfully
 *       404:
 *         description: Librarian not found
 *
 *   delete:
 *     summary: Delete a librarian by ID
 *     tags: [Librarian]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Librarian ID
 *     responses:
 *       204:
 *         description: Librarian deleted successfully
 *       404:
 *         description: Librarian not found
 */

// Librarian Routes
const apiVersionV1 = "v1";
const apiVersionV2 = "v2";

// v1 - No validation
router.use(`/api/${apiVersionV1}/librarian`, authMiddleware, createBaseRoutes(librarianController));

// v2 - With validation
router.use(`/api/${apiVersionV2}/librarian`, authMiddleware, validateLibrarianMiddlewareV2, createBaseRoutes(librarianController));

export default router;
