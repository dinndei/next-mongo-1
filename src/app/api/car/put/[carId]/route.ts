
import { connectToDB, disconnectFromDB } from "@/app/DB/connectinManager/connection";
import Car from "@/app/DB/models/Car";
import User from "@/app/DB/models/User";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(req: NextRequest) {
    try {
        await connectToDB();
        const carId = req.nextUrl.searchParams.get('carId');
        //קורא את ה body וממיר
        const newCar = await req.json();
        if (!newCar)
            throw new Error("missing body");
        const car = await Car.findByIdAndUpdate(carId,newCar,{new:false});
        await disconnectFromDB();
        return NextResponse.json({ status: 200, massage: "car updated successfully",car });
    }
    catch (err) {
        console.log(err);

        return NextResponse.json({ status: 400, massage: "error updating car", err: err });

    }
}