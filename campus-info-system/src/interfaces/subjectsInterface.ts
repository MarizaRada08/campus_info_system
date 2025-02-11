import { Document } from "mongoose";

export interface ISubject extends Document {
  Subject_ID: number;
  SubjectName: string;
  SubjectDescription: string;
  Course_ID: number;
  
}