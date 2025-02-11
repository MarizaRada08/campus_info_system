import { Request, Response } from "express";
import { Course } from "../models/courseModel";
import { ICourse } from "../interfaces/courseInterface";
import { validateCourseData } from "../validations/courseValidation";
import { BaseController } from "../controllers/baseController";

export class CourseController extends BaseController<ICourse> {
  updateCourse(arg0: string, authMiddleware: (req: Request, res: Response, next: import("express").NextFunction) => Response<any, Record<string, any>> | undefined, updateCourse: any) {
      throw new Error("Method not implemented.");
  }
  constructor() {
    super(Course);
  }

  // Create a new Course with validation
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateCourseData(req.body);
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

  // Update an existing Course with validation
  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateCourseData(req.body);
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
