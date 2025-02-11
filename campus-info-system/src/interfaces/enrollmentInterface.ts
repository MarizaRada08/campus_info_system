import { Document } from "mongoose";

export interface IEnrollment extends Document {
    EnrollmentID: number;
    StudentID: number;
    CourseID: number;
    EnrollmentDate: Date;
    
}