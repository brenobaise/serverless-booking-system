/* eslint-disable react/react-in-jsx-scope */
"use client";
import Dialog from "@/components/UI/Dialog";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className=''>
      <Dialog>
        <div className='max-w-2xl mx-auto mt-10 p-6 border rounded shadow bg-white'>
          <h1 className='text-2xl font-bold mb-4'>Welcome, Admin!</h1>
          <p className='mb-6 text-gray-600'>
            You are logged in and can manage the system.
          </p>

          <div className='flex gap-4'>
            <Link href='/admin/change-password'>
              <button className='bg-blue-600 text-white px-4 py-2 rounded'>
                Change Password
              </button>
            </Link>

            <form action='/api/auth/signout' method='post'>
              <button
                type='submit'
                className='bg-red-600 text-white px-4 py-2 rounded'
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
