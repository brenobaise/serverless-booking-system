"use client";

import { SessionProvider } from "next-auth/react";
import Header from "@/components/Header";
import "./styles/global.css";
import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <div className="flex flex-col w-full">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
