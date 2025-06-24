"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Module } from "@/app/interface/Module";

interface ModuleContextType {
  allModules: Module[];
  setAllModules: React.Dispatch<React.SetStateAction<Module[]>>;
}

const ModuleContext = createContext<ModuleContextType | undefined>(undefined);

export const ModuleProvider = ({ children }: { children: ReactNode }) => {
  const [allModules, setAllModules] = useState<Module[]>([]);

  useEffect(() => {
    const fetchAllModules = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/module/getAllModule`
        );
        const result = await res.json();
        const data: Module[] = result.data ?? [];

        if (Array.isArray(data)) {
          setAllModules(data);
        } else {
          setAllModules([]);
          console.error("Invalid module data:", data);
        }
      } catch (error) {
        console.error("Failed to load modules:", error);
      }
    };

    fetchAllModules();

    const interval = setInterval(fetchAllModules, 5 * 60 * 1000); // every 5 mins
    return () => clearInterval(interval);
  }, []);

  return (
    <ModuleContext.Provider value={{ allModules, setAllModules }}>
      {children}
    </ModuleContext.Provider>
  );
};

export const useModuleContext = () => {
  const context = useContext(ModuleContext);
  if (!context) {
    throw new Error("useModuleContext must be used within a ModuleProvider");
  }
  return context;
};
