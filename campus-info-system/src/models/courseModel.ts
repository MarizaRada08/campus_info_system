import mongoose, {Schema} from "mongoose";
import { ICourse} from "../interfaces/courseInterface";  // Importing the ICourse interface

// Define the schema for the Course model
const courseSchema = new Schema(
  {
    // Course ID - required, unique, and of type Number
    Course_ID: { type: Number, required: true, unique: true },
    // Course name - required and of type String
    Course_name: { type: String, required: true, length: 100 },
    // Credits - required and of type Number
    Credits: { type: Number, required: true },
    // Catalog number - required and of type String
    Catalog_no: { type: String, required: true, length: 50 },
    // Academic year - required and of type Number
    Academic_yr: { type: Number, required: true },
  },
  // Enable automatic timestamp fields (createdAt and updatedAt)
  { timestamps: true }
);

// Create and export the Course model
export const Course = mongoose.model<ICourse>('Courses', courseSchema);
