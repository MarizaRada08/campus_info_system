import mongoose, { Document, Schema } from "mongoose";
import { ILeave } from "../interfaces/leaveInterface";

interface leaveInterface extends Document{
  Leave_ID: Number,
  Leave_Type: String,
  Faculty_ID: Number, 
  Date: Date,
  Status:String,

}
// Define the schema for the Leave model
export const leaveSchema = new Schema(
  {
    Leave_ID: { type: Number, required: true, unique: true },
    Leave_Type: { type: String, enum: ["Sick", "Vacation", "Emergency", "Other"], required: true },
    Faculty_ID: { type: Number, required: true },
    Date: { type: Date, required: true },
    Status: { type: String, enum: ["Approved", "Pending", "Rejected"], required: true },
  },
  { timestamps: true }
);

// Create and export the Leave model
export const Leave = mongoose.model<ILeave>('Leave', leaveSchema);