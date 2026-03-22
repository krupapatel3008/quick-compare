import { createContext, useContext, useState } from "react";
import api from "@/api/axios";

const OrderContext = createContext(undefined);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  // ✅ FIXED: Now sends cart
  const placeOrder = async (userId, userName, items, totalPrice) => {
    try {
      const res = await api.post("/orders/place", {
        userId,
        userName,
        items,
        totalPrice,
      });

      const newOrder = res.data;

      setOrders((prev) => [newOrder, ...prev]);

      return newOrder;
    } catch (err) {
      throw err.response?.data || { msg: "Failed to place order" };
    }
  };


  const fetchAllOrders = async (filters = {}) => {
  try {
    const query = new URLSearchParams(filters).toString();

    const res = await api.get(`/orders/admin/all?${query}`);

    setOrders(res.data);
  } catch (err) {
    console.error(err);
  }
};


  const fetchUserOrders = async (userId) => {
  try {
    console.log("API CALL USER ID:", userId);

    const res = await api.get(`/orders/${userId}`);
    console.log("ORDERS:", res.data);

    setOrders(res.data);
  } catch (err) {
    console.error(err);
  }
};

  return (
    <OrderContext.Provider
      value={{
        orders,
        placeOrder,
        fetchUserOrders,
        fetchAllOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be used within OrderProvider");
  return ctx;
};