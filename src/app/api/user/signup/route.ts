
import { connectToDB, disconnectFromDB } from "@/app/DB/connectinManager/connection";
import User from "@/app/DB/models/User";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        await connectToDB();
        const { userName, email, password } = await req.json();
        console.log("uName:", userName);
        console.log("uEmail:", email);
        console.log("uPassword:", password);

        if (!userName || !email || !password)
            throw new Error("missing parameters");
        const newUser = new User({ userName, email, password });
        console.log("created", newUser);
        await newUser.save();
        await disconnectFromDB();
        return NextResponse.json({ status: 201, massage: "user created successfully" ,user:newUser});
    }
    catch (err) {
        console.log(err);

        return NextResponse.json({ status: 400, massage: "error creating user", err: err });

    }
}