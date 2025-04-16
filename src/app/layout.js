"use client";

import { SessionProvider } from "next-auth/react";
// import Header from "@/components/Header";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "react-datepicker/dist/react-datepicker.css";


import "./styles/global.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <SessionProvider>
          <Header />
          <main className="flex-grow flex justify-center items-start">
            {children}
          </main>
          <Footer />
        </SessionProvider>
      </body>

    </html>
  );
}
