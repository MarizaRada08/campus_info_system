import { Request, Response } from "express";
import { Schedule } from "../models/scheduleModel";
import { ISchedule } from "../interfaces/scheduleInterface";
import { validateScheduleData } from "../validations/scheduleValidation";
import { BaseController } from "../controllers/baseController";

export class ScheduleController extends BaseController<ISchedule> {
  updateSchedule(arg0: string, authMiddleware: (req: Request, res: Response, next: import("express").NextFunction) => Response<any, Record<string, any>> | undefined, updateSchedule: any) {
      throw new Error("Method not implemented.");
  }
  constructor() {
    super(Schedule);
  }

  // Create a new Schedule with validation
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateScheduleData(req.body);
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

  // Update an existing Schedule with validation
  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateScheduleData(req.body);
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
