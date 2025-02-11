import { Request, Response } from "express";
import { Shelf } from "../models/shelfModel";
import { IShelf } from "../interfaces/shelfInterface";
import { validateShelfData } from "../validations/shelfValidation";
import { BaseController } from "../controllers/baseController";

export class ShelfController extends BaseController<IShelf> {
  updateShelf(arg0: string, authMiddleware: (req: Request, res: Response, next: import("express").NextFunction) => Response<any, Record<string, any>> | undefined, updateShelf: any) {
      throw new Error("Method not implemented.");
  }
  constructor() {
    super(Shelf);
  }

  // Create a new Shelf with validation
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateShelfData(req.body);
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

  // Update an existing Shelf with validation
  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateShelfData(req.body);
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
