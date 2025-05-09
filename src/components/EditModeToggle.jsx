"use client";
import axios from "axios";
import { useEditMode } from "@/context/EditModeContext";
import { useSession } from "next-auth/react";

export default function EditModeToggle() {
  const { isEditMode, setIsEditMode } = useEditMode();
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin";

  if (!isAdmin) return null;

  const handleResetColours = async () => {
    try {
      await axios.patch("/api/store-config/background-colours", {
        reset: true,
      });
      window.location.reload(); // ensures colour refresh
    } catch (err) {
      console.error("Reset failed:", err);
      alert("Could not reset. Try again.");
    }
  };

  return (
    <div className='fixed bottom-4 right-4 z-50 space-y-2 flex flex-col items-end'>
      <button
        onClick={() => setIsEditMode(!isEditMode)}
        className={`px-4 py-2 text-white rounded ${
          isEditMode ? "bg-red-600" : "bg-green-600"
        }`}
      >
        {isEditMode ? "Exit Edit Mode" : "Enter Edit Mode"}
      </button>

      {isEditMode && (
        <button
          onClick={handleResetColours}
          className='bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded shadow'
        >
          Reset Colours
        </button>
      )}
    </div>
  );
}
