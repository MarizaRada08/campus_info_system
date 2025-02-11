// src/model/bookModel.ts
import mongoose, { Document, Schema } from 'mongoose';
import { IShelf } from '../interfaces/shelfInterface';

interface shelfInterface extends Document {
  Shelf_ID : Number;
  Shelf_Name : String;
  Category_ID : Number;
  Location : String;
}
const shelfSchema = new Schema({
  Shelf_ID :  { type: Number, required: true },
  Shelf_Name : { type: String, required: true },
  Category_ID :  { type: Number, required: true },
  Location : { type: String, required: true },
});

export const Shelf = mongoose.model<IShelf>('Shelves', shelfSchema);