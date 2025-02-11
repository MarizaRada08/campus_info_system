import { Document } from "mongoose";

export interface ILibrarian extends Document {
  Librarian_ID : Number;
  Name :  String;
  Email : String;
  Phone_Number : Number;
}
