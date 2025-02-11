import mongoose, { Document, Schema } from "mongoose";
import { IDepartment } from "../interfaces/departmentInterface";

interface leaveInterface extends Document{
  Department_ID: Number;
  Department_Name: String;
  Department_Head: string;

}
// Define the schema for the Department model
export const departmentSchema = new Schema(
  {
    Department_ID: { type: Number, required: true, unique: true },
    Department_Name: { type: String, required: true },
    Department_Head: { type: String, required: true },
  },
  { timestamps: true }
);

// Create and export the Department model
export const Department = mongoose.model<IDepartment>('Department', departmentSchema);