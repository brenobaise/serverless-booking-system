// components/DelayedApp.tsx
"use client";
import { useEffect, useState } from "react";
import LoadingSplash from "./LoadingSplash";

export default function DelayedApp({ children }) {
  const [showApp, setShowApp] = useState(false);

  useEffect(() => {
    // Delay showing app for 500ms or until hydrated
    const timer = setTimeout(() => {
      setShowApp(true);
    }, 2000); // Adjust time if needed

    return () => clearTimeout(timer);
  }, []);

  return showApp ? children : <LoadingSplash />;
}
