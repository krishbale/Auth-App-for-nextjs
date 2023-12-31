import NextAuth, { NextAuthConfig } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "./dbconnect";
import User from "../models/user";
import { authConfig } from "./auth.config";
export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
  } = NextAuth({
    ...authConfig,
    providers: [
        GithubProvider({
          clientId: process.env.GITHUB_ID!,
          clientSecret: process.env.GITHUB_SECRET!,
     
        }),
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID as string,
          clientSecret: process.env.GOOGLE_SECRET_ID as string,
        }),
        CredentialsProvider({
          credentials: {
            username: {},
            password: {},
          },
          async authorize(credentials) {
            await dbConnect();
            const user = await User.findOne({ username: credentials!.username });
            if (!user) {
              throw new Error("Not a valid credentials");
            }
            const isMatch = await bcrypt.compare(
              credentials!.password as string,
              user.password
            );
            if (isMatch) {
               return user;
            }
            if(!isMatch) throw new Error("Not a valid credentials");
    
            return null;
          },
        }),
      ],
      callbacks: 
      {
        async signIn({ user, account, profile }) {
          if (account!.provider === "github") {
            //@ts-ignore
            const imageUrl:string = profile!.avatar_url;
            await dbConnect();
            try {
              const user = await User.findOne({ email: profile!.email });
              if (!user) {
                const newUser = new User({
                  username: profile?.name,
                  email: profile!.email,
                  image:imageUrl,
                  role: "author",
                });
    
                await newUser.save();
              }
            } catch (err) {
              console.log(err);
              return false;
            }
          }
          if (account!.provider === "google") {
            await dbConnect();
            try {
              const user = await User.findOne({ email: profile!.email });
               //@ts-ignore
            const imageUrl:string = profile!.picture;
              if (!user) {
                const newUser = new User({
                  username: profile?.name,
                  email: profile!.email,
                  image: imageUrl,
                  role: "user",
                });
    
                await newUser.save();
              }
            } catch (err) {
              console.log(err);
              return false;
            }
          }
          return true;
        },
        ...authConfig.callbacks,
      },

      secret: process.env.NEXTAUTH_SECRET as string,

  })