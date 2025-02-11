import { Request, Response } from "express";
import { Category } from "../models/categoryModel";
import { ICategory } from "../interfaces/categoryInterface";
import { validateCategoryData } from "../validations/categoryValidation";
import { BaseController } from "../controllers/baseController";

export class CategoryController extends BaseController<ICategory> {
  updateCategory(arg0: string, authMiddleware: (req: Request, res: Response, next: import("express").NextFunction) => Response<any, Record<string, any>> | undefined, updateCategory: any) {
      throw new Error("Method not implemented.");
  }
  constructor() {
    super(Category);
  }

  // Create a new Category with validation
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateCategoryData(req.body);
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

  // Update an existing Category with validation
  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateCategoryData(req.body);
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
