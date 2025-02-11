import mongoose, {Schema } from "mongoose";
import { IGrade } from "../interfaces/gradeInterface";  // Importing the IGrade interface


// Define the schema for the Grade model
const gradeSchema = new Schema(
  {
    // Grade ID - required, unique, and of type Number
    Grade_ID: { type: Number, required: true, unique: true },
    // Student ID - required and of type Number
    Student_ID: { type: Number, required: true },
    // Subject description - required and of type String
    Subj_desc: { type: String, required: true, length: 200 },
    // Units - required and of type Number
    Units: { type: Number, required: true },
    // Credits - required and of type Number
    Credits: { type: Number, required: true },
    // Remarks - optional field, string type
    Remarks: { type: String, length: 500 },
  },
  // Enable automatic timestamp fields (createdAt and updatedAt)
  { timestamps: true }
);

// Create and export the Grade model
export const Grade = mongoose.model<IGrade>('Grades', gradeSchema);
