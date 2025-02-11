// src/model/bookModel.ts
import mongoose, { Document, Schema } from 'mongoose';
import { ILibrarian } from '../interfaces/librarianInterface';

interface librarianInterface extends Document {
  Librarian_ID : Number;
  Name :  String;
  Email : String;
  Phone_Number : Number;
}
const librarianSchema = new Schema({
  Librarian_ID : { type: Number, required: true },
  Name :   { type: String, required: true },
  Email :  { type: String, required: true },
  Phone_Number :  { type: Number, required: true },
});

export const Librarian = mongoose.model<ILibrarian>('librarian', librarianSchema);