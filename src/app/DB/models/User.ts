import { IUser } from "@/app/types/IUser";
import mongoose,{ Model, Schema } from "mongoose"

const IUserSchema:Schema<IUser>=new Schema({
    userName: { type: String, required: true ,unique:true},
    email: { type: String, required: true },
    password: { type: String, required: true },
})

const User:Model<IUser>=mongoose.models.User||mongoose.model<IUser>('User',IUserSchema);

export default User;