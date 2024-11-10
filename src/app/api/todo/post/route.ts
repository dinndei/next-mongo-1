import { connectToDB, disconnectFromDB } from "@/app/DB/connectinManager/connection";
import Todo from "@/app/DB/models/Todo";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectToDB();
        
        // Read and parse the request body
        const { task } = await req.json();
        if (!task) throw new Error("Missing parameters");

        const newTodo = new Todo({ task:task });
        console.log("in create todo server", task);
        console.log("created", newTodo);
        
        await newTodo.save();
        await disconnectFromDB();
        
        return NextResponse.json(
            { status: 201, message: "Todo created successfully", todo: newTodo },
            { status: 201 } // Set the HTTP status to 201 for success
        );
    } catch (err) {
        console.error("Error creating todo:", err);
        
        return NextResponse.json(
            { status: 500, message: "Server error creating todo", error: err },
            { status: 500 } // Set the HTTP status to 500 for an error
        );
    }
}
