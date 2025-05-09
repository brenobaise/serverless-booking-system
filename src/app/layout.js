"use client";

import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "react-datepicker/dist/react-datepicker.css";
import { EditModeProvider } from "@/context/EditModeContext";
import EditModeToggle from "@/components/EditModeToggle";
import EditableBackground from "@/components/EditableBackground";
import { setBackgroundColours } from "@/lib/backgroundColours"; // ✅ Add this import

import "./styles/global.css";

export default function RootLayout({ children }) {
  // ✅ Fetch background colours once when app loads
  useEffect(() => {
    const fetchBackgroundColours = async () => {
      try {
        const res = await fetch("/api/store-config/background-colours", {
          cache: "no-store", // or remove this if you prefer normal caching
        });
        const data = await res.json();
        await setBackgroundColours(data.background_colors);
      } catch (err) {
        console.error("Failed to fetch initial background colors:", err);
      }
    };

    fetchBackgroundColours();
  }, []);

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <SessionProvider>
          <EditModeProvider>
            <EditModeToggle />
            <Header />
            <EditableBackground
              configKey={"mainAPP-background"}
              defaultBgClass={"white"}
              btnName={"Change Main Bg Colour"}
            >
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
