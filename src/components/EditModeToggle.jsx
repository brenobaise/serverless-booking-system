"use client";
import { useEditMode } from "@/context/EditModeContext";
import { useSession } from "next-auth/react";
import { setBackgroundColours } from "@/lib/backgroundColours";

export default function EditModeToggle() {
  const { isEditMode, setIsEditMode } = useEditMode();
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin";

  if (!isAdmin) return null;

  const handleToggle = async () => {
    if (isEditMode) {
      // Exiting edit mode — fetch latest background colors from DB
      try {
        const res = await fetch("/api/store-config/background-colours", {
          cache: "no-store", // Ensure fresh data
        });

        if (res.ok) {
          const data = await res.json();
          await setBackgroundColours(data.background_colors);
        } else {
          console.error("Failed to fetch updated colors:", await res.text());
        }
      } catch (error) {
        console.error("Error reloading colors on edit mode exit:", error);
      }
    }

    // Toggle mode (enter or exit)
    setIsEditMode(!isEditMode);
  };

  return (
    <div className='fixed bottom-4 right-4 z-50'>
      <button
        onClick={handleToggle}
        className={`px-4 py-2 text-white rounded ${
          isEditMode ? "bg-red-600" : "bg-green-600"
        }`}
      >
        {isEditMode ? "Exit Edit Mode" : "Enter Edit Mode"}
      </button>
    </div>
  );
}
