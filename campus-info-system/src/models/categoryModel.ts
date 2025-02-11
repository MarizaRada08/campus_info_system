// src/model/bookModel.ts
import mongoose, { Document, Schema } from 'mongoose';
import { ICategory } from '../interfaces/categoryInterface';

interface categoryInterface extends Document {
  Category_ID : Number;
  Category_Name : String;
}
const categorySchema = new Schema({
  Category_ID : { type: Number, required: true },
  Category_Name : { type: String, required: true },
});

export const Category = mongoose.model<ICategory>('Books', categorySchema);