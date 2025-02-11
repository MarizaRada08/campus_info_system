import express from "express";
import Joi from "joi"; // Import Joi validation library
import { authMiddleware } from "../middleware/authMiddleware";
import { ScheduleController } from "../controllers/scheduleController";
import { createBaseRoutes } from "./baseRoutes";
import { validateScheduleMiddlewareV2 } from "../validations/scheduleValidation";

// Initialize express Router
const router = express.Router();
const scheduleController = new ScheduleController();


/**
 * @swagger
 * components:
 *   schemas:
 *     Schedule:
 *       type: object
 *       required:
 *         - Schedule_ID
 *         - Course_ID
 *         - Teacher
 *         - Days
 *         - Class_time
 *         - Room
 *         - Lecture
 *         - Laboratory
 *         - Units
 *       properties:
 *         Schedule_ID:
 *           type: integer
 *           description: The unique identifier for the schedule
 *           example: 1001
 *         Course_ID:
 *           type: integer
 *           description: The unique identifier for the course
 *           example: 101
 *         Teacher:
 *           type: string
 *           maxLength: 100
 *           description: The name of the instructor for the course
 *           example: "Dr. John Doe"
 *         Days:
 *           type: string
 *           maxLength: 20
 *           description: The days of the week the class meets
 *           example: "MWF"
 *         Class_time:
 *           type: string  // Changed to string
 *           description: The class start time (e.g., "10:00 PM - 11:30 PM")
 *           example: "10:00 PM - 11:30 PM"
 *         Room:
 *           type: string
 *           maxLength: 50
 *           description: The room number where the class is held
 *           example: "Room 101"
 *         Lecture:
 *           type: integer
 *           description: The number of lecture units
 *           example: 2
 *         Laboratory:
 *           type: integer
 *           description: The number of laboratory units
 *           example: 1
 *         Units:
 *           type: integer
 *           description: The total number of units for the course
 *           example: 3
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
 * /api/schedules:
 *   post:
 *     summary: Create a new schedule
 *     tags: [Schedule]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Schedule'
 *     responses:
 *       201:
 *         description: Schedule created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Schedule'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *
 *   get:
 *     summary: Get all schedules
 *     tags: [Schedule]
 *     responses:
 *       200:
 *         description: List of schedules
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Schedule'
 *
 * /api/schedules/{id}:
 *   get:
 *     summary: Get schedule by ID
 *     tags: [Schedule]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Schedule ID
 *     responses:
 *       200:
 *         description: Schedule details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Schedule'
 *       404:
 *         description: Schedule not found
 *
 *   put:
 *     summary: Update schedule
 *     tags: [Schedule]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Schedule ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Schedule'
 *     responses:
 *       200:
 *         description: Schedule updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Schedule'
 *       404:
 *         description: Schedule not found
 *
 *   delete:
 *     summary: Delete schedule
 *     tags: [Schedule]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Schedule ID
 *     responses:
 *       204:
 *         description: Schedule deleted successfully
 *       404:
 *         description: Schedule not found
 */

// Schedule Routes:

const apiVersionV1 = "v1";
const apiVersionV2 = "v2";

// v1 - No validation
router.use(`/api/${apiVersionV1}/schedule`, authMiddleware, createBaseRoutes(scheduleController));

// v2 - With validation
router.use(`/api/${apiVersionV2}/schedule`, authMiddleware, validateScheduleMiddlewareV2, createBaseRoutes(scheduleController));

export default router;