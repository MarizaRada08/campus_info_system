// src/model/bookModel.ts
import mongoose, { Document, Schema } from 'mongoose';
import { IBook } from '../interfaces/bookInterface';

interface bookInterface extends Document {
  Book_ID : Number;
  Student_ID : Number;
  Title : String; 
  Author : String;
  Publisher : String;
  Year_of_Publication : Date;
  Available_Copies : Number;
  Total_Copies : Number;
  Category_ID : Number;
  Shelf_ID : Number;
}
const bookSchema = new Schema({
  Book_ID : { type: Number, required: true },
  Student_ID : { type: Number, required: true },
  Title : { type: String, required: true },
  Author : { type: String, required: true },
  Publisher : { type: String, required: true },
  Year_of_Publication : { type: Date, required: true },
  Available_Copies : { type: Number, required: true },
  Total_Copies : { type: Number, required: true },
  Category_ID : { type: Number, required: true },
  Shelf_ID : { type: Number, required: true },
});

export const Book = mongoose.model<IBook>('Book', bookSchema);