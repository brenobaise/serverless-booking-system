// app/ClientLayout.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import { EditModeProvider } from "@/context/EditModeContext";
import EditModeToggle from "@/components/EditModeToggle";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EditableBackground from "@/components/EditableBackground";
import "react-datepicker/dist/react-datepicker.css";


import DelayedApp from "@/components/DelayedApp";

export default function ClientLayout({ children, mainBg }) {
    return (
        <SessionProvider>
            <EditModeProvider>
                <DelayedApp>
                    <EditModeToggle />
                    <Header />
                    <EditableBackground
                        configKey="mainAPP-background"
                        defaultBgClass={mainBg}
                        btnName="Change Main Bg Colour"
                    >
                        <div className="flex flex-col flex-grow w-full min-h-0">
                            <main className="flex-grow flex justify-center items-start px-4 py-10 min-h-[800px] sm:py-14">
                                {children}
                            </main>

                        </div>
                    </EditableBackground>
                    <Footer />
                </DelayedApp>
            </EditModeProvider>
        </SessionProvider>
    );
}

