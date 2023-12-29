export const dynamic = "force-dynamic";
import dbConn from "@/backend/lib/dbconnect";
import User from "@/backend/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { serialize } from 'cookie';

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const { username, password } = body;
  if (!username || !password) {
    return NextResponse.json(
      { message: "Please enter all fields" },
      { status: 422 }
    );
  }
  try {
    await dbConn();
    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json(
        { message: "Not a valid credentials" },
        { status: 422 }
      );
    }
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return NextResponse.json(
          { message: "Not a valid credentials" },
          { status: 422 }
        );
      }
    }

    const token = await user.generateAuthToken();
    const serialized = serialize('jwtoken', token, {
        path: '/',
        maxAge: 60 * 60 * 24, // 24 hours
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        sameSite: 'strict',
      });
      console.log(serialized)
    
      // Set the cookie in the response header
      
    return NextResponse.json(
      {
        body: {
          message: "Login successful",
        },
      },
      {
        status: 200,
      }
    );
  } catch (e) {
    return NextResponse.json(
      { message: "Server error, please try again!", error: e },
      { status: 500 }
    );
  }
}
