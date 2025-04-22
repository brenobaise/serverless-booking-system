/* eslint-disable no-undef */
import connectToDatabase from "@/lib/mongoose.js";
import { ensureAdminAccount } from "@/scripts/ensureAdmin";
import Admin from "@/app/models/AdminSchema"
import bcrypt from "bcrypt"
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// admin/dashboard
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDatabase();
        await ensureAdminAccount(); // Ensure admin is created on first login attempt

        const admin = await Admin.findOne({ email: credentials.username });
        if (!admin) return null;

        const valid = await bcrypt.compare(credentials.password, admin.passwordHash);
        if (!valid) return null;

        return { id: admin._id.toString(), name: "Admin", role: "admin" };


        return null; // Return null if login fails
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role || "user"; // Add role to the token
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role; // Add role to the session
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
