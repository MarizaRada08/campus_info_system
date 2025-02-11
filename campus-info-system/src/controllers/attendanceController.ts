import { Request, Response } from "express";
import { Attendance } from "../models/attendaceModel";
import { IAttendance } from "../interfaces/attendanceInterface";
import { validateAttendanceData } from "../validations/attendaceValidation";
import { BaseController } from "../controllers/baseController";

export class AttendanceController extends BaseController<IAttendance> {
  updateAttendance(arg0: string, authMiddleware: (req: Request, res: Response, next: import("express").NextFunction) => Response<any, Record<string, any>> | undefined, updateAttendance: any) {
      throw new Error("Method not implemented.");
  }
  constructor() {
    super(Attendance);
  }

  // Create a new Attendance with validation
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateAttendanceData(req.body);
      if (error) {
        res.status(400).json({ message: error.details.map((err) => err.message) });
        return;
      }
      req.body = payload; // Ensure validated payload is used
      await super.create(req, res);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Update an existing Attendance with validation
  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateAttendanceData(req.body);
      if (error) {
        res.status(400).json({ message: error.details.map((err) => err.message) });
        return;
      }
      req.body = payload; // Ensure validated payload is used
      await super.update(req, res);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
