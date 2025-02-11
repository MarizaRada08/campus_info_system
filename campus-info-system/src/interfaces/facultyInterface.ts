import { Document } from "mongoose";

// Define the IFaculty interface for faculty documents in the database
export interface IFaculty extends Document {
  Faculty_ID: Number; 
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