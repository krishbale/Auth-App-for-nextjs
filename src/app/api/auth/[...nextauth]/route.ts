import dbConnect from "@/backend/lib/dbconnect";
import User from "@/backend/models/user";
import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
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
          credentials!.password,
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
    async jwt({ token, user }) {
      if (user) {
        await dbConnect();
        const DBUSER = await User.findOne({ email: user.email });
        token.id = user.id;
        token.role = DBUSER!.role;
      }
      return Promise.resolve(token);
    },
    async session({ session, token }) {
      if (token) {
          //@ts-ignore
        session.user.id = token.id;
          //@ts-ignore
        session.user.role = token.role;
      }
      return session;
    },
    
   
 
   
  },

  pages: {
    signIn: "/login",
  },


  secret: process.env.NEXTAUTH_SECRET as string,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
