import { connectToDB, disconnectFromDB } from "@/app/DB/connectinManager/connection";
import Todo from "@/app/DB/models/Todo";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest,{ params }: { params: { id: string } }) {
    try {
        await connectToDB();
        const id = params.id;
        console.log("id: ",id);

        if (!id) {
            await disconnectFromDB();
            return NextResponse.json({
                status: 400,
                message: "Bad Request: Missing ID parameter",
            });
        }
        
        const todo = await Todo.findOne({ _id: new ObjectId(id) });
        await disconnectFromDB();
        return todo ?
            NextResponse.json({ status: 200, message: "ok", todo }) :
            NextResponse.json({ status: 404, message: "error getting todo-not found" });
    }
    catch (err) {
        return NextResponse.json({ status: 500, message: "Server error getting todo", err });
    }

}