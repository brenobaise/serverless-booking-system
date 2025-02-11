import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    authorized: ({ token, req }) => {
      const isAdmin = token?.role === "admin";

      // allow user actions to GET requests
      if (req.method === "GET") {
        return true;
      }

      // Restrict POST, PUT , DELETE to admin users
      return isAdmin;
    },
  },
});

export const config = {
  matcher: [
    "/api/bookings/:path*", // Protect bookings API
    "/api/services/:path*", // Protect services API
  ],
};
