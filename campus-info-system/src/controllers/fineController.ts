import { Request, Response } from "express";
import { Fine } from "../models/fineModel";
import { IFine } from "../interfaces/fineInterface";
import { validateFineData } from "../validations/fineValidation";
import { BaseController } from "../controllers/baseController";

export class FineController extends BaseController<IFine> {
  updateFine(arg0: string, authMiddleware: (req: Request, res: Response, next: import("express").NextFunction) => Response<any, Record<string, any>> | undefined, updateFine: any) {
      throw new Error("Method not implemented.");
  }
  constructor() {
    super(Fine);
  }

  // Create a new Fine with validation
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateFineData(req.body);
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

  // Update an existing Fine with validation
  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateFineData(req.body);
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
