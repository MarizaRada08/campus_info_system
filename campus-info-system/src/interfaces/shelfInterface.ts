import { Document } from "mongoose";

export interface IShelf extends Document {
  Shelf_ID : Number;
  Shelf_Name : String;
  Category_ID : Number;
  Location : String;
}
