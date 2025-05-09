"use client";
import axios from "axios";

export default function ResetColoursButton() {
  const handleReset = async () => {
    try {
      await axios.patch("/api/store-config/background-colours", {
        reset: true,
      });
      window.location.reload(); // Refresh to apply
    } catch (err) {
      console.error("Reset failed:", err);
      alert("Failed to reset colours.");
    }
  };

  return (
    <button
      onClick={handleReset}
      className='bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded shadow'
    >
      Reset Colours
    </button>
  );
}
