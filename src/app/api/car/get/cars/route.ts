import { connectToDB, disconnectFromDB } from "@/app/DB/connectinManager/connection";
import Car from "@/app/DB/models/Car";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connectToDB();
        const cars = await Car.find({});
        await disconnectFromDB();
        return cars ?
            NextResponse.json({ "status": 200, "massage": "ok", cars }) :
            NextResponse.json({ "status": 404, "massage": "error getting cars-not found" });
    }
    catch (err) {
        NextResponse.json({ "status": 400, "massage": "error in getting cars", err });
    }

}