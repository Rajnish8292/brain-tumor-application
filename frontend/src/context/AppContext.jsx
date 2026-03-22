"use client";

import { createContext, useContext, useState } from "react";

const appContext = createContext(undefined);

const AppContextProvider = ({ children }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResults, setUploadResults] = useState(null);

  const contextValue = {
    isUploading,
    setIsUploading,
    uploadResults,
    setUploadResults,
  };

  return (
    <appContext.Provider value={contextValue}>{children}</appContext.Provider>
  );
};

const useAppContext = () => {
  const context = useContext(appContext);

  if (!context)
    throw new Error("useAppContext must be within AppContext provider");

  return context;
};
export { AppContextProvider, useAppContext };
