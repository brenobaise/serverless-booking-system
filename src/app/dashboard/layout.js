import "../styles/global.css"; // Tailwind global styles
import Header from "@/components/Header";
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
      <div className="flex flex-col flex-grow">
        <main className="p-6 bg-gray-100 flex-grow">{children}</main>
      </div>
    </div>
  );
}
