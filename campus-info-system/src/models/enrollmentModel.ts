// src/model/bookModel.ts
import mongoose, { Document, Schema } from 'mongoose';
import { IEnrollment } from '../interfaces/enrollmentInterface';

interface enrollmentInterface extends Document {
  Enrollment_ID : Number;
  Student_ID : Number;
  Course_ID : Number;
  EnrollmentDate : Date;
}
const enrollmentSchema = new Schema({
  Enrollment_ID : { type: Number, required: true },
  Student_ID : { type: Number, required: true },
  Course_ID : { type: Number, required: true },
  EnrollmentDate : { type: Date, required: true },
});

export const Enrollment = mongoose.model<IEnrollment>('Enrollment', enrollmentSchema);