import { connectToDB, disconnectFromDB } from "@/app/DB/connectinManager/connection";
import Car from "@/app/DB/models/Car";
import { NextRequest,NextResponse } from "next/server";

export async function GET(req:NextRequest){
    try{
    await connectToDB();
    const carId=req.nextUrl.searchParams.get('carId');
    const cars=await Car.findById(carId);
    await disconnectFromDB();
    return cars?
    NextResponse.json({"status":200,"massage":"ok",cars}):
    NextResponse.json({"status":404,"massage":"car not found"});
}
catch (err) {
    NextResponse.json({ "status": 400, "massage": "error getting car",err });
}

}