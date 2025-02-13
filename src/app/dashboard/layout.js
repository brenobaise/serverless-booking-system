/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import "../styles/global.css"; // Tailwind global styles
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation"; // Import redirect utility
import Sidebar from "@/components/Sidebar/SideBar";

export default async function DashboardLayout({ children }) {
  // Get the session
  const session = await getServerSession(authOptions);

  // Check if the session exists and the user is an admin
  if (!session || session.user.role !== "admin") {
    // Redirect to the /services page
    redirect("/services");
  }

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <div className='flex flex-row p-6 '>
      <Sidebar />
      <main className=''>{children}</main>
    </div>
  );
}
