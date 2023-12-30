import dbConn from "@/backend/lib/dbconnect";
import User from "@/backend/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: any, res: any) {
  const body = await req.json();
  const { username, password } = body;
  if (!username || !password) {
    return NextResponse.json(
      { message: "Please enter all fields" },
      { status: 422 }
    );
  }
  await dbConn();
  const user = await User.findOne({ username });
  const checkEmail = await User.findOne({ email: body.email });
  if (user || checkEmail) {
    return NextResponse.json(
      { message: "username or email is already taken" },
      { status: 422 }
    );
  }

  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(body.password, salt);
    body.password = hashedPassword;
    await User.create(body);

    return NextResponse.json(
      { message: "User Registeration successfull" },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json( { message: "Internal Server Error" },
    { status: 500 }
  );
  }
}
