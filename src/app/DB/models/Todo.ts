import { ITodo } from "@/app/types/ITodo";
import mongoose, { Model, Schema } from "mongoose";

const ITodoSchema:Schema<ITodo>=new Schema({
    task: {type:String,required:true,unique:true},
})

const Todo:Model<ITodo>=mongoose.models.Todo||mongoose.model("Todo",ITodoSchema);

export default Todo;