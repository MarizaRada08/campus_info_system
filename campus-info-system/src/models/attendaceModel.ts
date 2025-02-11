import mongoose, {Document, Schema } from "mongoose";
import { IAttendance } from "../interfaces/attendanceInterface";

interface leaveInterface extends Document{
  Attendance_ID: Number; // Primary Key for attendance record
  Date: Date; // The date of the attendance
  Status: "Present" | "Absent" | "Late" | "Excused"; // Enum for attendance status

}
// Define the schema for the Attendance model
export const attendanceSchema = new Schema(
  {
    Attendance_ID: { type: Number, required: true, unique: true },
    Date: { type: Date, required: true },
    Status: { type: String, enum: ["Present", "Absent", "Late","Excused"], required: true },
  },
  { timestamps: true }
);

// Create and export the Attendance model
export const Attendance = mongoose.model<IAttendance>('Attendance', attendanceSchema);