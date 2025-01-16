"use client";

import { SessionProvider } from "next-auth/react";
import Header from "@/components/Header"; // Ensure the correct path to Header
import "./styles/global.css"; // Import global styles

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <div className="flex flex-col w-full">
            <Header />
            <main>{children}</main>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
