import { connectToDB, disconnectFromDB } from "@/app/DB/connectinManager/connection";
import Todo from "@/app/DB/models/Todo";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connectToDB();
        const todoList = await Todo.find({});
        await disconnectFromDB();
        return todoList ?
            NextResponse.json({ status: 200, message: "ok", todoList }) :
            NextResponse.json({ status: 404, message: "error getting todos-not found" });
    }
    catch (err) {
        return NextResponse.json({ status: 500, message: "Server error getting all todos",  err });
    }
}