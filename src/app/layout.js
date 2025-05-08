"use client";

import { SessionProvider } from "next-auth/react";
// import Header from "@/components/Header";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "react-datepicker/dist/react-datepicker.css";
import { EditModeProvider } from "@/context/EditModeContext";
import EditModeToggle from "@/components/EditModeToggle";
import EditableBackground from "@/components/EditableBackground";

import "./styles/global.css";



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <SessionProvider>
          <EditModeProvider>
            <EditModeToggle />
            <Header />
            <EditableBackground configKey={'mainAPP-background'} defaultBgClass={"white"} btnName={'Change Main Bg Colour'} >
              <main className="flex-grow flex justify-center items-start">
                {children}
              </main>
            </EditableBackground>
            <Footer />
          </EditModeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

