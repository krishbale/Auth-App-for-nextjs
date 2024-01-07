import NextAuth, { NextAuthConfig } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "./dbconnect";
import User from "../models/user";
import { authConfig } from "./auth.config";
import { validateuser } from "./action";
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
          async authorize(credentials) {
            try {
           const user = await validateuser(credentials);
           return user;
            } catch (err:any) {
              return null; 
            }
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
         //@ts-ignore
      async jwt({ token, user }) {
        if (user) {
          await dbConnect();
          const DBUSER = await User.findOne({ email: user.email });
          token.id = user.id;
          token.role = DBUSER!.role;
       
        }
        return Promise.resolve(token);
      },
  
        ...authConfig.callbacks,
      },

      secret: process.env.NEXTAUTH_SECRET as string,

  })