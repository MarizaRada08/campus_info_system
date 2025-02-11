import mongoose, { Document, Schema } from "mongoose";
import { IFaculty } from "../interfaces/facultyInterface";

interface leaveInterface extends Document{
  Faculty_ID: Number; // Primary Key
  First_Name: String;
  Last_Name: String;
  Gender: "Male" | "Female" | "Other"; 
  Age: Number;
  Email: String;
  Contact: String;
  Faculty_Role: String;
  Department_ID: Number;
  Leave_ID: Number; 
  Attendance_ID: Number;
  Student_Grade: String;

}
// Define the schema for the Faculty model
export const facultySchema = new Schema(
  {
    Faculty_ID: { type: Number, required: true, unique: true },
    First_Name: { type: String, required: true },
    Last_Name: { type: String, required: true },
    Gender: { type: String, enum: ["Male", "Female"], required: true },
    Age: { type: Number, required: true },
    Email: { type: String, required: true, unique: true },
    Contact: { type: String, required: true },
    Faculty_Role: { type: String, required: true },
    Department_ID: { type: Number, required: true },
    Leave_ID: { type: Number, required: true },
    Attendance_ID: { type: Number, required: true },
    Student_Grade: { type: String, required: true },
  },
  { timestamps: true }
);

// Create and export the Faculty model
export const Faculty = mongoose.model<IFaculty>('Faculty', facultySchema);