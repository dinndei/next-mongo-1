import { connectToDB, disconnectFromDB } from "@/app/DB/connectinManager/connection";
import User from "@/app/DB/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    await connectToDB();
    const userName = req.nextUrl.searchParams.get('userName');
    const user = userName ? await User.findOne({userName}) : null;
    await disconnectFromDB();
    return user
        ? NextResponse.json({ status: 200, message: "User found", user: user })
        : NextResponse.json({ status: 404, message: "User not found" });
}
