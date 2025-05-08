"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { signOut } from "next-auth/react";

export default function ChangePasswordPage() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/admin/change-password", {
        oldPassword,
        newPassword,
      });

      setMessage(res.data.message);
      setTimeout(() => {
        signOut({ callbackUrl: "/api/auth/signin" });
      }, 2000);
    } catch (err) {
      setMessage(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className='max-w-md mx-auto mt-10 p-4 border rounded shadow bg-white'>
      <h2 className='text-xl font-bold mb-4'>Change Admin Password</h2>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='password'
          placeholder='Old Password'
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className='border p-2 rounded'
          required
        />
        <input
          type='password'
          placeholder='New Password'
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className='border p-2 rounded'
          required
        />
        <button className='bg-blue-600 text-white p-2 rounded'>
          Change Password
        </button>
      </form>
      {message && <p className='mt-4 text-green-600'>{message}</p>}
    </div>
  );
}
