import {  Types } from "mongoose";

export interface ITodo extends Document{
  _id: Types.ObjectId; 
  task: string;
}
