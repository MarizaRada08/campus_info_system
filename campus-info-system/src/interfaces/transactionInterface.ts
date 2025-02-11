import { Document } from "mongoose";

export interface ITransaction extends Document {
  Transaction_ID : Number;
  Student_ID : Number;
  Book_ID : Number;
  Faculty_ID : Number; 
  Borrow_Date : Date;
  Return_Date : Date;
  Fine : Number;
}
