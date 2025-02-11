import { Document } from "mongoose";

export interface ICourse extends Document {
  Course_ID : Number;
  Course_name : String;
  Credits : Number;
  Catalog_no : String;
  Academic_yr : Number;
} 
