
import { connectToDB, disconnectFromDB } from "@/app/DB/connectinManager/connection";
import Todo from "@/app/DB/models/Todo";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(req: NextRequest,{ params }: { params: { id: string } }) {
    try {
        await connectToDB();
        const id = params.id;
        if (!id) {
            disconnectFromDB();
            return NextResponse.json({ status: 400, message: "todo ID is required" });
        }
        //קורא את ה body וממיר
        const newTodo = await req.json();
        if (!newTodo)
            throw new Error("missing body");
        const query = { _id: new ObjectId(String(id)) };
        const todo = await Todo.updateOne(query, newTodo,{new:true});
    
        await disconnectFromDB();
        return todo?
        NextResponse.json({ status: 200, message: "ok", todo }) :
        NextResponse.json({ status: 404, message: "error updating todo-not found" });
    }
    catch (err) {
    return NextResponse.json({ status: 500, message: "Server error updating todo",  err });
    }
}