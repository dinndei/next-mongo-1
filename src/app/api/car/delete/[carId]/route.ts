import { connectToDB, disconnectFromDB } from "@/app/DB/connectinManager/connection";
import Car from "@/app/DB/models/Car";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    try {
        await connectToDB();
        const carId = req.nextUrl.searchParams.get('carId');
        const car = await Car.findByIdAndDelete(carId);
        await disconnectFromDB();
        return car ?
            NextResponse.json({ "status": 200, "massage": "car deleted", car }) :
            NextResponse.json({ "status": 404, "massage": "error deleteing car-not found" });
    }
    catch (err) {
        NextResponse.json({ "status": 400, "massage": "error deleteing car",err });
    }

}