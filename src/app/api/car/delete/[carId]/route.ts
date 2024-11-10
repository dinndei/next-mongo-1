import { connectToDB, disconnectFromDB } from "@/app/DB/connectinManager/connection";
import Car from "@/app/DB/models/Car";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function DELETE(req: NextRequest) {
    try {
        await connectToDB();
        const carId = req.nextUrl.searchParams.get('carId');
   
        if (!carId) {
            return NextResponse.json({ status: 400, message: "Car ID is required" });
        }
        
        const deleteResult = await Car.deleteOne({ _id: new ObjectId(carId) });
        await disconnectFromDB();
        
        return deleteResult.deletedCount > 0
            ? NextResponse.json({ status: 200, message: "Car deleted successfully" })
            : NextResponse.json({ status: 404, message: "Error deleting car - not found" });
    } 
    catch (err) {
        return NextResponse.json({ status: 500, message: "Server error deleting car",  err });
    }
}