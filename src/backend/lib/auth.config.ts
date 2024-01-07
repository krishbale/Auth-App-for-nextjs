// import dbConnect from "./dbconnect";
// import User from "../models/user";
export const 
authConfig = {
  pages: {
    signIn: "/login",
  },

  providers: [],
  callbacks: {
    
     
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
