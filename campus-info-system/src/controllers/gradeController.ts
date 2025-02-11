import { Request, Response } from "express";
import { Grade } from "../models/gradeModel";
import { IGrade } from "../interfaces/gradeInterface";
import { validateGradeData } from "../validations/gradeValidation";
import { BaseController } from "../controllers/baseController";

export class GradeController extends BaseController<IGrade> {
  updateGrade(arg0: string, authMiddleware: (req: Request, res: Response, next: import("express").NextFunction) => Response<any, Record<string, any>> | undefined, updateGrade: any) {
      throw new Error("Method not implemented.");
  }
  constructor() {
    super(Grade);
  }

  // Create a new Grade with validation
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateGradeData(req.body);
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

  // Update an existing Grade with validation
  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateGradeData(req.body);
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
