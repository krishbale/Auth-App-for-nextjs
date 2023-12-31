'use server'
import User from "../models/user";
import { signIn, signOut } from "./auth";
import dbConnect from "./dbconnect";
import bcrypt from "bcryptjs";
export const handleGithubLogin = async () => {
    await signIn("github");
  };
  export const handleGoogleLogin = async () => {
    await signIn("google");
  };
  
  export const handleLogout = async () => {
    await signOut();
  };
  
export const login = async (prevState:any, formData:FormData) => {
    const { username, password } = Object.fromEntries(formData);
  
    try {
      await signIn("credentials", { username, password });
    } catch (err:any) {
      console.log(err);
  
      if (err.message.includes("CredentialsSignin")) {
        return { error: "Invalid username or password" };
      }
      throw err;
    }
  };

  
export const register = async (previousState:any, formData:FormData) => {
    const { username, email, password, img, passwordRepeat } =
      Object.fromEntries(formData);
  
    if (password !== passwordRepeat) {
      return { error: "Passwords do not match" };
    }
  
    try {
      await dbConnect();
  
      const user = await User.findOne({ username });
  
      if (user) {
        return { error: "Username already exists" };
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password as string, salt);
  
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        img,
      });
  
      await newUser.save();
      console.log("saved to db");
  
      return { success: true };
    } catch (err) {
      console.log(err);
      return { error: "Something went wrong!" };
    }
  };