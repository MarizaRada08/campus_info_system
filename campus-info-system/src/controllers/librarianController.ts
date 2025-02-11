import { Request, Response } from "express";
import { Librarian } from "../models/librarianModel";
import { ILibrarian } from "../interfaces/librarianInterface";
import { validateLibrarianData } from "../validations/librarianValidation";
import { BaseController } from "../controllers/baseController";

export class LibrarianController extends BaseController<ILibrarian> {
  updateLibrarian(arg0: string, authMiddleware: (req: Request, res: Response, next: import("express").NextFunction) => Response<any, Record<string, any>> | undefined, updateLibrarian: any) {
      throw new Error("Method not implemented.");
  }
  constructor() {
    super(Librarian);
  }

  // Create a new Librarian with validation
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateLibrarianData(req.body);
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

  // Update an existing Librarian with validation
  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateLibrarianData(req.body);
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
