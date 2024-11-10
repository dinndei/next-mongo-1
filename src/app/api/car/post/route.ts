
import { connectToDB, disconnectFromDB } from "@/app/DB/connectinManager/connection";
import Car from "@/app/DB/models/Car";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        await connectToDB();
        //קורא את ה body וממיר
        const { id, name, model } = await req.json();
        console.log("id:",id );
        console.log("name:", name);
        console.log("model:", model);

        if (!id || !name || !model)
            throw new Error("missing parameters");
        const newCar = new Car({  id, name, model });
        console.log("created", newCar);
        await newCar.save();
        await disconnectFromDB();
        return NextResponse.json({ status: 201, massage: "car created successfully" ,newCar});
    }
    catch (err) {
        console.log(err);
        return NextResponse.json({ status: 400, massage: "error creating car", err: err });

    }
}