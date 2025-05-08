// context/EditModeContext.tsx
"use client";
import { createContext, useContext, useState } from "react";

const EditModeContext = createContext(null);

export const EditModeProvider = ({ children }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <EditModeContext.Provider value={{ isEditMode, setIsEditMode }}>
      {children}
    </EditModeContext.Provider>
  );
};

export const useEditMode = () => useContext(EditModeContext);
