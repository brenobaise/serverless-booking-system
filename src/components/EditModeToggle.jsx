"use client";
import { useEditMode } from "@/context/EditModeContext";
import { useSession } from "next-auth/react";

export default function EditModeToggle() {
  const { isEditMode, setIsEditMode } = useEditMode();
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin";

  if (!isAdmin) return null;

  const handleToggle = () => {
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
