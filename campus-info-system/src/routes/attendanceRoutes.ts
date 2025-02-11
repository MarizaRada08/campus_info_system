import express from "express";
import { AttendanceController } from "../controllers/attendanceController";
import { authMiddleware } from "../middleware/authMiddleware";
import { createBaseRoutes } from "./baseRoutes";
import { validateAttendanceMiddlewareV2 } from "../validations/attendaceValidation";

// Initialize express Router
const router = express.Router();
// Create instance of AttendanceController to handle route logic
const attendanceController = new AttendanceController();

/**
 * @swagger
 * tags:
 *   name: Attendance
 *   description: Attendance management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Attendance:
 *       type: object
 *       properties:
 *         attendance_ID:
 *           type: number
 *           description: Unique identifier for the attendance record
 *           example: "ATT-001"
 *         Date:
 *           type: date
 *           format: date
 *           description: Date of the attendance
 *           example: "2024-11-22"
 *         Status:
 *           type: string
 *           description: Attendance status (e.g., present, absent, late)
 *           example: "present"
 *       required:
 *         - attendance_ID
 *         - Date
 *         - Status
 *
 *     AttendanceResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: Unique identifier for the attendance record
 *           example: "ATT-001"
 *         Date:
 *           type: string
 *           format: date
 *           description: Date of the attendance
 *           example: "2024-11-22"
 *         Status:
 *           type: string
 *           description: Attendance status (e.g., present, absent, late)
 *           example: "present"
 */

/**
 * @swagger
 * /api/attendance:
 *   post:
 *     summary: Create a new attendance record
 *     tags: [Attendance]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Attendance'
 *     responses:
 *       201:
 *         description: Attendance record created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AttendanceResponse'
 *       400:
 *         description: Validation error
 *       409:
 *         description: Attendance record already exists
 * 
 *   get:
 *     summary: Get all attendance records
 *     tags: [Attendance]
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
 *         description: List of attendance records
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/AttendanceResponse'
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
 * /api/attendance/{id}:
 *   get:
 *     summary: Get attendance record by ID
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Attendance record ID
 *     responses:
 *       200:
 *         description: Attendance record details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AttendanceResponse'
 *       404:
 *         description: Attendance record not found
 *   put:
 *     summary: Update attendance record
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Attendance record ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Attendance'
 *     responses:
 *       200:
 *         description: Attendance record updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AttendanceResponse'
 *       404:
 *         description: Attendance record not found
 *   delete:
 *     summary: Delete attendance record
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Attendance record ID
 *     responses:
 *       204:
 *         description: Attendance record deleted successfully
 *       404:
 *         description: Attendance record not found
 */


// Attendance Routes:
const apiVersionV1 = "v1";
const apiVersionV2 = "v2";

// v1 - No validation
router.use(`/api/${apiVersionV1}/attendance`, authMiddleware, createBaseRoutes(attendanceController));

// v2 - With validation
router.use(`/api/${apiVersionV2}/attendance`, authMiddleware, validateAttendanceMiddlewareV2, createBaseRoutes(attendanceController));

export default router;
