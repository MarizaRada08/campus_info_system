import { Document } from "mongoose";

export interface IDepartment extends Document {
    Department_ID: Number;
    Department_Name: String;
    Department_Head: String;
}
