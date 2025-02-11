// src/model/bookModel.ts
import mongoose, { Document, Schema } from 'mongoose';
import { ITransaction } from '../interfaces/transactionInterface';

interface transactionInterface extends Document {
  Transaction_ID : Number;
  Student_ID : Number;
  Book_ID : Number;
  Faculty_ID : Number; 
  Borrow_Date : Date;
  Return_Date : Date;
  Fine : Number;
}
const transactionSchema = new Schema({
  Transaction_ID : { type: Number, required: true },
  Student_ID : { type: Number, required: true },
  Book_ID : { type: Number, required: true },
  Faculty_ID : { type: Number, required: true },
  Borrow_Date : { type: Date, required: true },
  Return_Date : { type: Date, required: true },
  Fine : { type: Number, required: true },
});

export const Transaction = mongoose.model<ITransaction>('Transactions', transactionSchema);