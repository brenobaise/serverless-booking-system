// app/ClientLayout.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import { EditModeProvider } from "@/context/EditModeContext";
import EditModeToggle from "@/components/EditModeToggle";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EditableBackground from "@/components/EditableBackground";

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
                        <main className="flex-grow flex justify-center items-start">
                            {children}
                        </main>
                    </EditableBackground>
                    <Footer />
                </DelayedApp>
            </EditModeProvider>
        </SessionProvider>
    );
}

