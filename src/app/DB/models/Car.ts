import { ICar } from "@/app/types/ICar";
import mongoose, { Model, Schema } from "mongoose";

const ICarSchema:Schema<ICar>=new Schema({
    id: {type:String,required:true,unique:true},
    name: {type:String,required:true},
    model: {type:String,required:true}
})

const Car:Model<ICar>=mongoose.models.Car||mongoose.model("Car",ICarSchema);

export default Car;