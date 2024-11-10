import { connectToDB, disconnectFromDB } from "@/app/DB/connectinManager/connection";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import Todo from "@/app/DB/models/Todo";

export async function DELETE(req: NextRequest,{ params }: { params: { id: string } }) {
    try {
        await connectToDB();
        const id = params.id;
   
        if (!id) {
            disconnectFromDB();
            return NextResponse.json({ status: 400, message: "todo ID is required" });
        }
        
        const deleteResult = await Todo.deleteOne({ _id: new ObjectId(id) });
        await disconnectFromDB();
        
        return deleteResult.deletedCount > 0
            ? NextResponse.json({ status: 200, message: "todo deleted successfully" })
            : NextResponse.json({ status: 404, message: "Error deleting todo - not found" });
    } 
    catch (err) {
        return NextResponse.json({ status: 500, message: "Server error deleting todo",  err });
    }
}