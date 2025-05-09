"use client";
import { useEditMode } from "@/context/EditModeContext";
import { useEffect, useState } from "react";
import { SketchPicker } from "react-color";
import axios from "axios";

export default function EditableBackground({
  configKey,
  defaultBgClass = "#ffffff",
  children,
  btnName,
}) {
  const { isEditMode } = useEditMode();
  const [colour, setColour] = useState(null); // persisted color from DB
  const [draftColour, setDraftColour] = useState(null); // preview color in picker
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    const loadColour = async () => {
      try {
        const res = await axios.get("/api/store-config/background-colours", {
          headers: {
            "Cache-Control": "no-store", // ensures fresh DB fetch
          },
        });

        const saved = res.data.background_colors?.[configKey];

        if (saved) {
          setColour(saved);
          setDraftColour(saved);
        } else {
          setColour(defaultBgClass);
          setDraftColour(defaultBgClass);
        }
      } catch (err) {
        console.error("Error fetching background color:", err);
        setColour(defaultBgClass);
        setDraftColour(defaultBgClass);
      }
    };

    loadColour();
  }, [configKey, defaultBgClass]);

  const handleSave = async () => {
    try {
      await axios.patch("/api/store-config/background-colours", {
        background_colors: {
          [configKey]: draftColour,
        },
      });

      setColour(draftColour);
      setShowPicker(false);
    } catch (err) {
      console.error(
        "Failed to update background colour:",
        err?.response?.data || err.message
      );
    }
  };

  const handleCancel = () => {
    setDraftColour(colour);
    setShowPicker(false);
  };

  return (
    <div
      style={{ backgroundColor: draftColour || defaultBgClass }}
      className={`relative flex flex-col flex-grow w-full  ${
        !colour && defaultBgClass
      }`}
    >
      {isEditMode && (
        <div className='absolute top-2 right-2 z-50'>
          <div className='backdrop-blur-md bg-white/60 rounded shadow-md p-2'>
            <button
              onClick={() => setShowPicker(!showPicker)}
              className='text-black px-4 py-1 rounded text-xs hover:bg-white/80'
            >
              {btnName || "Colour Picker"}
            </button>

            {showPicker && (
              <div className='mt-2 space-y-2'>
                <SketchPicker
                  color={draftColour || "#ffffff"}
                  onChange={(newColor) => setDraftColour(newColor.hex)}
                />
                <div className='flex justify-end space-x-2 text-xs'>
                  <button
                    onClick={handleCancel}
                    className='bg-gray-200 hover:bg-gray-300 text-black px-3 py-1 rounded'
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className='bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded'
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {children}
    </div>
  );
}
