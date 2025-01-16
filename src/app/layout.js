"use client";

import { SessionProvider } from "next-auth/react";
import Header from "@/components/Header";
import "./styles/global.css";
import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <SessionProvider>
          <Header />
          <main className="flex-grow bg-gray-100 p-6">{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
