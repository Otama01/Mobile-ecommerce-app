import React, { createContext, useContext, useState } from "react";

type Order = {
  id: number;
  items: any[];
  total: number;
  date: string;
};

type OrdersContextType = {
  orders: Order[];
  addOrder: (order: Order) => void;
};

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export const OrdersProvider = ({ children }: any) => {
  const [orders, setOrders] = useState<Order[]>([]);

  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]); // newest first
  };

  return (
    <OrdersContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error("useOrders must be used within OrdersProvider");
  }
  return context;
};