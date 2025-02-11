import mongoose, { Document, Schema } from 'mongoose';
import { IStudent } from '../interfaces/studentInterface';

interface student extends Document {
  Student_ID: number;
  StudentStatus: "Active" | "Inactive" | "Graduated" | "Dropped";
  YearLevel: number;
  FirstName: string;
  LastName: string;
  MiddleName: string;
  Address: string;
  Email: string;
  Phone: string; 
  DateOfBirth: Date;
  PlaceOfBirth: string;
  Sex: "Male" | "Female";
  Religion: string;
  Nationality: string;
  CivilStatus: string;
  Occupation: string;
  WorkAddress: string;
  Course_ID: number;
  Subject_ID: number;
  Enrollment_ID: number;
}

const studentSchema = new Schema({
  Student_ID: { type: Number, required: true },
  StudentStatus: { type: String, enum: ["Active", "Inactive", "Graduated", "Dropped"], required: true },
  YearLevel: { type: Number, required: true },
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  MiddleName: { type: String, required: true },
  Address: { type: String, required: true },
  Email: { type: String, required: true },
  Phone: { type: String, required: true },  // Phone as String
  DateOfBirth: { type: Date, required: true },
  PlaceOfBirth: { type: String, required: true },
  Sex: { type: String, enum: ["Male", "Female"], required: true },
  Religion: { type: String, required: true },
  Nationality: { type: String, required: true }, // Corrected from "Stype" to "type"
  CivilStatus: { type: String, required: true },
  Occupation: { type: String, required: true },
  WorkAddress: { type: String, required: true },
  Course_ID: { type: Number, required: true },
  Subject_ID: { type: Number, required: true },
  Enrollment_ID: { type: Number, required: true },
});

export const Student = mongoose.model<IStudent>('Student', studentSchema);