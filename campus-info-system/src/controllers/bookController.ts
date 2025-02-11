import { Request, Response } from "express";
import { Book } from "../models/bookModel";
import { IBook } from "../interfaces/bookInterface";
import { validateBookData } from "../validations/bookValidation";
import { BaseController } from "../controllers/baseController";

export class BookController extends BaseController<IBook> {
  updatebook(arg0: string, authMiddleware: (req: Request, res: Response, next: import("express").NextFunction) => Response<any, Record<string, any>> | undefined, updatebook: any) {
      throw new Error("Method not implemented.");
  }
  constructor() {
    super(Book);
  }

  // Create a new book with validation
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateBookData(req.body);
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

  // Update an existing book with validation
  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateBookData(req.body);
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
