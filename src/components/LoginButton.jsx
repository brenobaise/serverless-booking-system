"use client";

import { signIn } from "next-auth/react";

export default function LoginButton() {
  return (
    <button
      onClick={() => signIn(undefined, { callbackUrl: "/dashboard" })}
      className="bg-green-500 text-white px-4 py-2 rounded"
    >
      Admin Login
    </button>
  );
}
