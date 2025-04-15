"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import Button from "./UI/Button";
import { signOut, signIn } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  // Check if the logged-in user is an admin
  const isAdmin = session?.user?.role === "admin";

  return (
    <div
      className='bg-slate-900  p-4 flex flex-col 
    sm:flex-row sm:justify-between sm:items-center '
    >
      {/* Title Section */}
      <div className=' flex justify-start sm:justify-start  '>
        <h1 className='text-bold text-white text-2xl sm:text-4xl text-center'>
          A Serverless Booking System
        </h1>
      </div>

      {/* Navigation Links */}
      <nav className='flex mt-4 flex-col sm:flex-row sm:gap-6 sm:mt-4'>
        <Link
          href='/services'
          className='text-white text-lg border-b-2 border-transparent hover:border-slate-300'
        >
          Services
        </Link>
        <Link
          href='/bookings'
          className='text-white text-lg border-b-2 border-transparent hover:border-slate-300'
        >
          Bookings
        </Link>
        {isAdmin && (
          <Link
            href='/dashboard'
            className='text-white text-lg border-b-2 border-transparent hover:border-slate-300'
          >
            Dashboard
          </Link>
        )}
      </nav>

      {/* Login/Logout Button */}
      <div className='mt-4 sm:mt-0 flex justify-center'>
        {session ? (
          isAdmin ? (
            <Button
              children='Logout'
              onClick={() => signOut()}
              size='medium'
              variant='danger'
              className=' transition ease-in delay-150 hover:font-medium hover:bg-opacity-85'
            />
          ) : null // Non-admin users don't see any buttons
        ) : (
          <Button
            children='Login'
            onClick={() => signIn(undefined, { callbackUrl: "/dashboard" })}
            size='medium'
            variant='success'
            className='transition ease-in delay-150 hover:font-medium '
          />
        )}
      </div>
    </div>
  );
}
