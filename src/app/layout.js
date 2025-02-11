"use client";

import { SessionProvider } from "next-auth/react";
// import Header from "@/components/Header";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import "./styles/global.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Header />
          <div className="flex flex-row justify-center items-center ">
            <main className="">{children}</main>
          </div>
        </SessionProvider>
        <Footer />
      </body>
    </html>
  );
}
