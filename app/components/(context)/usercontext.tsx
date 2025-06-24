"use client";

import { User } from "@/app/interface/User";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface UserContextType {
  allUsers: User[];
  setAllUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [allUsers, setAllUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/getAllUsers`
        );
        const result = await res.json();
        const data: User[] = result.data ?? [];
        if (Array.isArray(data)) {
          setAllUsers(data);
        } else {
          setAllUsers([]);
          console.error("Invalid user data:", data);
        }
      } catch (error) {
        console.error("Failed to load users:", error);
      }
    };

    fetchAllUsers();

    const interval = setInterval(fetchAllUsers, 5 * 60 * 1000); // refresh every 5 mins

    return () => clearInterval(interval);
  }, []);

  return (
    <UserContext.Provider value={{ allUsers, setAllUsers }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext easier
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
