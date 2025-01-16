"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import Button from "./Button";
import { signOut, signIn } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  // Check if the logged-in user is an admin
  const isAdmin = session?.user?.role === "admin";

  return (
    <div className="bg-black flex flex-col sm:flex-row sm:justify-between sm:items-center p-4">
      {/* Title Section */}
      <div className="flex justify-center sm:justify-start">
        <h1 className="text-bold text-white text-2xl sm:text-4xl text-center">
          Booking SeSy
        </h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col sm:flex-row sm:gap-6 mt-4 sm:mt-0 items-center justify-center">
        <Link href="/services" className="text-white text-lg hover:underline">
          Services
        </Link>
        <Link href="/bookings" className="text-white text-lg hover:underline">
          Bookings
        </Link>
        {isAdmin && (
          <Link
            href="/dashboard"
            className="text-white text-lg hover:underline"
          >
            Dashboard
          </Link>
        )}
      </nav>

      {/* Login/Logout Button */}
      <div className="mt-4 sm:mt-0 flex justify-center">
        {session ? (
          isAdmin ? (
            <Button
              children="Logout"
              onClick={() => signOut()}
              size="medium"
              variant="danger"
              className=" transition ease-in delay-150 hover:font-medium hover:bg-opacity-85"
            />
          ) : null // Non-admin users don't see any buttons
        ) : (
          <Button
            children="Login"
            onClick={() => signIn(undefined, { callbackUrl: "/dashboard" })}
            size="medium"
            variant="success"
            className="transition ease-in delay-150 hover:font-medium "
          />
        )}
      </div>
    </div>
  );
}
