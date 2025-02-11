import { Document } from "mongoose";

export interface IStudent extends Document {
  Student_ID: number;
  StudentStatus: string;
  YearLevel: number;
  FirstName: string;
  LastName: string;
  MiddleName: string;
  Address: string;
  Email: string;
  Phone: number;
  DateOfBirth: Date;
  PlaceOfBirth: string;
  Sex: string;
  Religion: string;
  Nationality: string;
  CivilStatus: string;
  Occupation: string;
  WorkAddress: string;
  Course_ID: number;
  Subject_ID: number;
  Enrollment_ID: number;
  
}