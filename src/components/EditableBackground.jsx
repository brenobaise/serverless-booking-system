"use client";
import { useEditMode } from "@/context/EditModeContext";
import { useEffect, useState } from "react";
import { SketchPicker } from "react-color";

export default function EditableBackground({
  configKey,
  defaultBgClass = "",
  children,
  btnName,
}) {
  const { isEditMode } = useEditMode();
  const [color, setColor] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(configKey);
    if (stored) setColor(stored);
  }, [configKey]);

  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
    localStorage.setItem(configKey, newColor.hex);
  };

  return (
    <div
      style={color ? { backgroundColor: color } : {}}
      className={`relative group ${!color && defaultBgClass}`}
    >
      {isEditMode && (
        <div className='absolute top-2 right-2 z-50 transition-opacity duration-300 opacity-0 group-hover:opacity-100'>
          <div className='backdrop-blur-md bg-white/60 rounded shadow-md'>
            <button
              onClick={() => setShowPicker(!showPicker)}
              className='text-black px-6 py-2 rounded text-xs hover:bg-white/80'
            >
              {btnName || "Colour Picker"}
            </button>
          </div>
          {showPicker && (
            <div className='mt-2'>
              <SketchPicker
                color={color || "#ffffff"}
                onChange={handleColorChange}
              />
            </div>
          )}
        </div>
      )}

      {children}
    </div>
  );
}
