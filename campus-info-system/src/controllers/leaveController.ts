import { Request, Response } from "express";
import { Leave } from "../models/leaveModel";
import { ILeave } from "../interfaces/leaveInterface";
import { validateLeaveData } from "../validations/leaveValidation";
import { BaseController } from "../controllers/baseController";

export class LeaveController extends BaseController<ILeave> {
  updateLeave(arg0: string, authMiddleware: (req: Request, res: Response, next: import("express").NextFunction) => Response<any, Record<string, any>> | undefined, updateLeave: any) {
      throw new Error("Method not implemented.");
  }
  constructor() {
    super(Leave);
  }

  // Create a new Leave with validation
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateLeaveData(req.body);
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

  // Update an existing Leave with validation
  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateLeaveData(req.body);
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
