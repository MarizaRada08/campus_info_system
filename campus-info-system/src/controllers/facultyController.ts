import { Request, Response } from "express";
import { Faculty } from "../models/facultyModel";
import { IFaculty } from "../interfaces/facultyInterface";
import { validateFacultyData } from "../validations/facultyValidation";
import { BaseController } from "../controllers/baseController";

export class FacultyController extends BaseController<IFaculty> {
  updateFaculty(arg0: string, authMiddleware: (req: Request, res: Response, next: import("express").NextFunction) => Response<any, Record<string, any>> | undefined, updateFaculty: any) {
      throw new Error("Method not implemented.");
  }
  constructor() {
    super(Faculty);
  }

  // Create a new Faculty with validation
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateFacultyData(req.body);
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

  // Update an existing Faculty with validation
  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateFacultyData(req.body);
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
