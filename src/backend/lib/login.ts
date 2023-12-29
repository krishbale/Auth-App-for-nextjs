import dbConn from "@/backend/lib/dbconnect";
import User from "@/backend/models/user";
import bcrypt from "bcryptjs";

export async function validateuser(email:string, password:string) {
  if (!email || !password) {
    throw new Error("Please enter all fields");
  }
  try {
    await dbConn();
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Not a valid credentials");
    }
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error("Not a valid credentials");
      }
    }
    return user;
  } catch (e) {
        throw new Error("user validaton error, please try again!")
      }
    }
