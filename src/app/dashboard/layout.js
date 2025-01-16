import "../styles/global.css"; // Tailwind global styles
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation"; // Import redirect utility
import Sidebar from "@/components/Sidebar";

export default async function DashboardLayout({ children }) {
  // Get the session
  const session = await getServerSession(authOptions);

  // Check if the session exists and the user is an admin
  if (!session || session.user.role !== "admin") {
    // Redirect to the /services page
    redirect("/services");
  }

  return (
    <div className="flex flex-row h-dvh border-5 border-red-500">
      <div>
        <Sidebar />
      </div>
      <main className="">{children}</main>
    </div>
  );
}
