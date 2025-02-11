import { Document } from "mongoose";

export interface ISchedule extends Document {
    Schedule_ID : Number;
    Course_ID : Number;
    Teacher : String;
    Days : String;
    Class_time : String;
    Room : String;
    Lecture : Number;
    Laboratory : Number;
    Units : Number;
}
