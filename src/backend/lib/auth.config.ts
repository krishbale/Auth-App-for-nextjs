import User from "../models/user";
import dbConnect from "./dbconnect";

export const authConfig = {
  pages: {
    signIn: "/login",
  },

  providers: [],
  callbacks: {
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
    //@ts-ignore
    async session({ session, token }) {
      if (token) {
        //@ts-ignore
        session.user.id = token.id;
        //@ts-ignore
        session.user.role = token.role;
      }
      return session;
    },

    // redirect({
    //   url,
    //   baseUrl,
    //   user,
    // }: {
    //   url: string;
    //   baseUrl: string;
    //   user: any;
    // }) {
    //   if (url === "/login") {
    //     console.log( "user",user);
    //     // Redirect user to different pages based on their role after sign-in
    //     switch (user.role) {
    //       case "admin":
    //         return Promise.resolve(baseUrl + "/admin");
    //       case "author":
    //         return Promise.resolve(baseUrl + "/author");
    //       default:
    //         return Promise.resolve(baseUrl + "/");
    //     }
    //   }
    //   return Promise.resolve(url);
    // },
    //@ts-ignore
    authorized({ auth, request }) {
      const user = auth?.user;
      const isOnAdminPanel = request.nextUrl?.pathname.startsWith("/admin");
      const isOnAuthorPanel = request.nextUrl?.pathname.startsWith("/author");
      const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login");

      // ONLY ADMIN CAN REACH THE ADMIN DASHBOARD

      if (isOnAdminPanel && user?.role !== "admin") {
        return false;
      }
    
      if (isOnAuthorPanel && user?.role !== "author") {
        return false;
      }

      if (isOnAuthorPanel && !user) {
        return false;
      }

      // ONLY UNAUTHENTICATED USERS CAN REACH THE LOGIN PAGE

      if (user && isOnLoginPage) {
        let home =  new URL("/", request.nextUrl)
        return Response.redirect(home);
      }

    

      return true;
    },
  },
};
