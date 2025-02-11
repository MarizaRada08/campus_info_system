import { Document } from "mongoose";

export interface ILeave extends Document {
    Leave_ID: Number,
    Leave_Type: String,
    Faculty_ID: Number, 
    Date: Date,
    Status:String,
}
