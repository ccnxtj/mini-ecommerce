"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "./auth-context";

export type OrderItem = {
  id: string;
  name: string;
  price: number;
  image: string;
};

export type Order = {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: string;
};

type OrderContextType = {
  orders: Order[];
  addOrder: (order: Order) => void;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const savedOrders = localStorage.getItem(`orders_${user.email}`);
      if (savedOrders) {
        try {
          setOrders(JSON.parse(savedOrders));
        } catch (e) {
          console.error(e);
        }
      } else {
        setOrders([]);
      }
    } else {
      setOrders([]);
    }
  }, [user]);

  const addOrder = (order: Order) => {
    setOrders((prev) => {
      const newOrders = [order, ...prev];
      if (user) {
        localStorage.setItem(`orders_${user.email}`, JSON.stringify(newOrders));
      }
      return newOrders;
    });
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrders must be used within OrderProvider");
  return context;
}
