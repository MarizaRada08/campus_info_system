import mongoose, { Schema } from "mongoose";
import { ISchedule } from "../interfaces/scheduleInterface"; // Importing the ISchedule interface

// Define the schema for the Schedule model
const scheduleSchema = new Schema(
  {
    // Schedule ID - required, unique, and of type Number
    Schedule_ID: { type: Number, required: true, unique: true },
    // Course ID - required and of type Number
    Course_ID: { type: Number, required: true },
    // Teacher's name - required and of type String
    Teacher: { type: String, required: true, maxlength: 100 },
    // Days of the week when the class is scheduled - required and of type String
    Days: { type: String, required: true, maxlength: 50 },
    // Class time - required and stored as a Date
    Class_time: { type: String, required: true },
    // Room where the class will take place - required and of type String
    Room: { type: String, required: true, maxlength: 100 },
    // Lecture duration in hours - required and of type Number
    Lecture: { type: Number, required: true },
    // Laboratory duration in hours - required and of type Number
    Laboratory: { type: Number, required: true },
    // Total units of the class - required and of type Number
    Units: { type: Number, required: true },
  },
  {
    // Enable automatic timestamp fields (createdAt and updatedAt)
    timestamps: true,
  }
);

// Create and export the Schedule model
export const Schedule = mongoose.model<ISchedule>("Schedules", scheduleSchema);
