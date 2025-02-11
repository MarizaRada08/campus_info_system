// src/model/bookModel.ts
import mongoose, { Document, Schema } from 'mongoose';
import { IFine } from '../interfaces/fineInterface';

interface fineInterface extends Document {
  Fine_ID : Number;
  Student_ID : Number;
  Transaction_ID : Number;
  Amount : Number;
  Status : "Paid" | "Unpaid" | "Fine Incurred" | "Fine Paid"| "Not Returned";
}
const fineSchema = new Schema({
  Fine_ID : { type: Number, required: true },
  Student_ID : { type: Number, required: true },
  Transaction_ID : { type: Number, required: true },
  Amount : { type: Number, required: true },
  Status : { type: String,    enum: ["Paid", "Unpaid", "Fine Incurred", "Fine Paid", "Not Returned"], default: "available", required: true },
});

export const Fine = mongoose.model<IFine>('Fines', fineSchema);