import "../styles/global.css"; // Tailwind global styles
import Sidebar from "@/components/Sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation"; // Import redirect utility

export default async function DashboardLayout({ children }) {
  // Get the session
  const session = await getServerSession(authOptions);

  // Check if the session exists and the user is an admin
  if (!session || session.user.role !== "admin") {
    // Redirect to the /services page
    redirect("/services");
  }

  // If the user is an admin, render the dashboard layout
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <main className=" ">{children}</main>
    </div>
  );
}
