// src/model/bookModel.ts
import mongoose, { Document, Schema } from 'mongoose';
import { ISubject } from '../interfaces/subjectsInterface';

interface subjectsInterface extends Document {
  Subject_ID : Number;
  SubjectName : String;
  SubjectDescription : String;
  Course_ID : Number;
}
const subjectsSchema = new Schema({
  Subject_ID : { type: Number, required: true },
  SubjectName : { type: String, required: true },
  SubjectDescription : { type: String, required: true },
  Course_ID : { type: Number, required: true },
  
});

export const Subject = mongoose.model<ISubject>('Subject', subjectsSchema);