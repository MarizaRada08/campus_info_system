import { Request, Response } from "express";
import { Student } from "../models/studentModel";
import { IStudent } from "../interfaces/studentInterface";
import { validateStudentData } from "../validations/studentValidation";
import { BaseController } from "../controllers/baseController";

export class StudentController extends BaseController<IStudent> {
  updateStudent(arg0: string, authMiddleware: (req: Request, res: Response, next: import("express").NextFunction) => Response<any, Record<string, any>> | undefined, updateStudent: any) {
      throw new Error("Method not implemented.");
  }
  constructor() {
    super(Student);
  }

  // Create a new Student with validation
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateStudentData(req.body);
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

  // Update an existing Student with validation
  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateStudentData(req.body);
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
