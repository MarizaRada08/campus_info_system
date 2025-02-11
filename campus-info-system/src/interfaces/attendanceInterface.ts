import { Document } from "mongoose";

// Define the IAttendance interface for attendance documents in the database
export interface IAttendance extends Document {
  Attendance_ID: Number; 
  Date: Date; 
  Status: String;
}

