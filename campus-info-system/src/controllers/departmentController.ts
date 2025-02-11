import { Request, Response } from "express";
import { Department } from "../models/departmentModel";
import { IDepartment } from "../interfaces/departmentInterface";
import { validateDepartmentData } from "../validations/departmentValidation";
import { BaseController } from "../controllers/baseController";

export class DepartmentController extends BaseController<IDepartment> {
  updateDepartment(arg0: string, authMiddleware: (req: Request, res: Response, next: import("express").NextFunction) => Response<any, Record<string, any>> | undefined, updateDepartment: any) {
      throw new Error("Method not implemented.");
  }
  constructor() {
    super(Department);
  }

  // Create a new Department with validation
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateDepartmentData(req.body);
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

  // Update an existing Department with validation
  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateDepartmentData(req.body);
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
