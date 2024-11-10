import {  Types } from "mongoose";

export interface ICar extends Document{
  _id: Types.ObjectId; 
  id: string;
  name: string;
  model: string;
}
