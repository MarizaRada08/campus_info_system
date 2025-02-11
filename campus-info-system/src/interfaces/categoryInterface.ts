import { Document } from "mongoose";

export interface ICategory extends Document {
  Category_ID : Number;
  Category_Name : String;
}
