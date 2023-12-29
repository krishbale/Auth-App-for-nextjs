import dbConnect from "@/backend/lib/dbconnect";
import User from "@/backend/models/user";
import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_SECRET_ID as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account!.provider === "github") {
        await dbConnect();
        try {
          const user = await User.findOne({ email: profile!.email });

          if (!user) {
            const newUser = new User({
              username: profile?.name,
              email: profile!.email,
              image: profile!.image,
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

          if (!user) {
            const newUser = new User({
              username: profile?.name,
              email: profile!.email,
              image: profile!.image,
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
  },
  secret: process.env.NEXTAUTH_SECRET as string,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };