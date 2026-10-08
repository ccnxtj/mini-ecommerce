"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type User = {
  name: string;
  email: string;
  picture: string;
} | null;

type AuthContextType = {
  user: User;
  isInitialized: boolean;
  login: (userData: NonNullable<User>) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // รีเซ็ตข้อมูลทุกครั้งที่ restart server (npm run dev)
    const currentStartTime = process.env.NEXT_PUBLIC_APP_START_TIME;
    const savedStartTime = localStorage.getItem("app-start-time");
    
    if (currentStartTime && savedStartTime !== currentStartTime) {
      localStorage.clear();
      localStorage.setItem("app-start-time", currentStartTime);
    }

    // โหลดข้อมูลเมื่อเข้าเว็บ
    const savedUser = localStorage.getItem("auth-user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (err) {
        console.error("Failed to parse user data");
      }
    }
    setIsInitialized(true);
  }, []);

  const login = (userData: NonNullable<User>) => {
    setUser(userData);
    localStorage.setItem("auth-user", JSON.stringify(userData)); // บันทึกตอนล็อกอิน
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth-user"); // ลบออกตอนล็อกเอาท์
  };

  return (
    <AuthContext.Provider value={{ user, isInitialized, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
