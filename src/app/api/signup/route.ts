export const dynamic = "force-dynamic";
import dbConn from "@/backend/lib/dbconnect";
import User from "@/backend/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: any, res: any) {
  const body = await req.json();
    const { username,  password } = body;
    if (!username || !password) {
      return NextResponse.json(
        { message: "Please enter all fields" },
        { status: 422 }
      );
    }
    const user = await User.findOne({ username });
    if (user) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 422 }
      );
    }

  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(body.password, salt);
    body.password = hashedPassword;
    console.log(body);
    await dbConn();
    await User.create(body);
    return NextResponse.json(
      {
        status: 200,
      }
    );
  } catch (e) {
    return NextResponse.json(
      { status: 500 }
    );
  }
}
