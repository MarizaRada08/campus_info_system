import { Request, Response } from "express";
import { Transaction } from "../models/transactionModel";
import { ITransaction } from "../interfaces/transactionInterface";
import { validateTransactionData } from "../validations/transactionValidation";
import { BaseController } from "../controllers/baseController";

export class TransactionController extends BaseController<ITransaction> {
  updateTransaction(arg0: string, authMiddleware: (req: Request, res: Response, next: import("express").NextFunction) => Response<any, Record<string, any>> | undefined, updateTransaction: any) {
      throw new Error("Method not implemented.");
  }
  constructor() {
    super(Transaction);
  }

  // Create a new Transaction with validation
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateTransactionData(req.body);
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

  // Update an existing Transaction with validation
  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateTransactionData(req.body);
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
