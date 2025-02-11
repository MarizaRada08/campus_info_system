import { Request, Response } from "express";
import { Enrollment } from "../models/enrollmentModel";
import { IEnrollment } from "../interfaces/enrollmentInterface";
import { validateEnrollmentData } from "../validations/enrollmentValidation";
import { BaseController } from "../controllers/baseController";

export class EnrollmentController extends BaseController<IEnrollment> {
  updateEnrollment(arg0: string, authMiddleware: (req: Request, res: Response, next: import("express").NextFunction) => Response<any, Record<string, any>> | undefined, updateEnrollment: any) {
      throw new Error("Method not implemented.");
  }
  constructor() {
    super(Enrollment);
  }

  // Create a new Enrollment with validation
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateEnrollmentData(req.body);
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

  // Update an existing Enrollment with validation
  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateEnrollmentData(req.body);
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
