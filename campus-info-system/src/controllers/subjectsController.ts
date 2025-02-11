import { Request, Response } from "express";
import { Subject } from "../models/subjectsModel";
import { ISubject } from "../interfaces/subjectsInterface";
import { validateSubjectData } from "../validations/subjectsValidation";
import { BaseController } from "../controllers/baseController";

export class SubjectController extends BaseController<ISubject> {
  updateSubject(arg0: string, authMiddleware: (req: Request, res: Response, next: import("express").NextFunction) => Response<any, Record<string, any>> | undefined, updateSubject: any) {
      throw new Error("Method not implemented.");
  }
  constructor() {
    super(Subject);
  }

  // Create a new Subject with validation
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateSubjectData(req.body);
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

  // Update an existing Subject with validation
  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateSubjectData(req.body);
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
