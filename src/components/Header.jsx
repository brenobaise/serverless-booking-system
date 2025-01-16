"use client";

import { useSession } from "next-auth/react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

export default function Header() {
  const { data: session } = useSession();

  // Check if the logged-in user is an admin
  const isAdmin = session?.user?.role === "admin";

  return (
    <div className="bg-blue-600 min-h-20 flex justify-between items-center p-4">
      <div>
        <h1 className="text-bold text-white text-4xl">Our Services</h1>
      </div>

      <div>
        {session ? (
          isAdmin ? (
            <LogoutButton /> // Only show logout for admin
          ) : null // Non-admin users don't see any buttons
        ) : (
          <LoginButton /> // Show login button for unauthenticated users
        )}
      </div>
    </div>
  );
}
