import dbConnect from "@/backend/lib/dbconnect";
import User from "@/backend/models/user";
import { NextResponse } from "next/server";

export async function POST(req: any, res: any) {
    const body = await req.json();
    await dbConnect();
    const DBUSER = await User.findOne({ email: body.email });
    return NextResponse.json(
        {
            role: DBUSER.role,
        },
        {
            status: 200,
        }
    );

}
