import { Document } from "mongoose";

export interface IFine extends Document {
  Fine_ID : Number;
  Student_ID : Number;
  Transaction_ID : Number;
  Amount : Number;
  Status : String;
}
