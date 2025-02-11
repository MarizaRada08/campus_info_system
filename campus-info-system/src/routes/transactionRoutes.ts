import express from "express";
import { TransactionController } from "../controllers/transactionController";
import { authMiddleware } from "../middleware/authMiddleware";
import { createBaseRoutes } from "./baseRoutes";
import { validateTransactionMiddlewareV2 } from "../validations/transactionValidation";

// Initialize express Router
const router = express.Router();

// Create an instance of TransactionController to handle route logic
const transactionController = new TransactionController();

/**
 * @swagger
 * tags:
 *   - name: Transaction
 *     description: Transaction endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       properties:
 *         Transaction_ID:
 *           type: number
 *           example: 1001
 *         Student_ID:
 *           type: number
 *           example: 12345
 *         Book_ID:
 *           type: number
 *           example: 67890
 *         Faculty_ID:
 *           type: number
 *           example: 111
 *         Borrow_Date:
 *           type: string
 *           format: date
 *           example: "2024-01-01"
 *         Return_Date:
 *           type: string
 *           format: date
 *           example: "2024-01-15"
 *         Fine:
 *           type: number
 *           example: 50
 *       required:
 *         - Transaction_ID
 *         - Student_ID
 *         - Book_ID
 *         - Faculty_ID
 *         - Borrow_Date
 *     TransactionResponse:
 *       type: object
 *       properties:
 *         Transaction_ID:
 *           type: number
 *         Student_ID:
 *           type: number
 *         Book_ID:
 *           type: number
 *         Faculty_ID:
 *           type: number
 *         Borrow_Date:
 *           type: string
 *           format: date
 *         Return_Date:
 *           type: string
 *           format: date
 *         Fine:
 *           type: number
 *     UpdateTransactionRequest:
 *       type: object
 *       properties:
 *         Return_Date:
 *           type: string
 *           format: date
 *         Fine:
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
 * /api/transaction:
 *   post:
 *     summary: Create a new transaction
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transaction'
 *     responses:
 *       201:
 *         description: Transaction created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransactionResponse'
 *       400:
 *         description: Validation error
 *       409:
 *         description: Transaction already exists
 *
 *   get:
 *     summary: Retrieve a list of transactions
 *     tags: [Transaction]
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
 *         description: List of transactions with pagination
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/TransactionResponse'
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 */

/**
 * @swagger
 * /api/transaction/{id}:
 *   get:
 *     summary: Retrieve transaction details by ID
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction ID
 *     responses:
 *       200:
 *         description: Transaction details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransactionResponse'
 *       404:
 *         description: Transaction not found
 *
 *   put:
 *     summary: Update a transaction by ID
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTransactionRequest'
 *     responses:
 *       200:
 *         description: Transaction updated successfully
 *       404:
 *         description: Transaction not found
 *
 *   delete:
 *     summary: Delete a transaction by ID
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction ID
 *     responses:
 *       204:
 *         description: Transaction deleted successfully
 *       404:
 *         description: Transaction not found
 */


// Transaction Routes
const apiVersionV1 = "v1";
const apiVersionV2 = "v2";

// v1 - No validation
router.use(`/api/${apiVersionV1}/transaction`, authMiddleware, createBaseRoutes(transactionController));

// v2 - With validation
router.use(`/api/${apiVersionV2}/transaction`, authMiddleware, validateTransactionMiddlewareV2, createBaseRoutes(transactionController));

export default router;
