"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface StoreContextType {
  storeName: string;
  logoUrl: string;
  setStoreName: (name: string) => void;
  setLogoUrl: (url: string) => void;
  isLoading: boolean;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [storeName, setStoreNameState] = useState("Flor e Açúcar");
  const [logoUrl, setLogoUrlState] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedName = localStorage.getItem("store-name");
    const savedLogo = localStorage.getItem("store-logo");
    
    if (savedName) setStoreNameState(savedName);
    if (savedLogo) setLogoUrlState(savedLogo);
    
    setIsLoading(false);
  }, []);

  const setStoreName = (name: string) => {
    setStoreNameState(name);
    localStorage.setItem("store-name", name);
  };

  const setLogoUrl = (url: string) => {
    setLogoUrlState(url);
    localStorage.setItem("store-logo", url);
  };

  return (
    <StoreContext.Provider value={{ storeName, logoUrl, setStoreName, setLogoUrl, isLoading }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
