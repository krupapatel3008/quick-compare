import { createContext, useContext, useState, useEffect } from "react";

const OrderContext = createContext(undefined);
const ORDERS_KEY = "qc_orders";

const getStoredOrders = () => {
  const data = localStorage.getItem(ORDERS_KEY);
  return data ? JSON.parse(data) : [];
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(getStoredOrders);

  useEffect(() => localStorage.setItem(ORDERS_KEY, JSON.stringify(orders)), [orders]);

  const placeOrder = (userId, userName, cartItems, totalPrice) => {
    const order = {
      id: `ORD-${Date.now()}`,
      userId,
      userName,
      items: cartItems,
      totalPrice,
      status: "placed",
      createdAt: new Date().toISOString(),
      trackingSteps: [
        { label: "Order Placed", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), done: true },
        { label: "Packed", time: "", done: false },
        { label: "Out for Delivery", time: "", done: false },
        { label: "Delivered", time: "", done: false },
      ],
    };
    setOrders((prev) => [order, ...prev]);
    return order;
  };

  const updateOrderStatus = (orderId, stepIndex) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;
        const newSteps = order.trackingSteps.map((step, i) => {
          if (i <= stepIndex) return { ...step, done: true, time: step.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
          return { ...step, done: false, time: "" };
        });
        const statusMap = ["placed", "packed", "in_transit", "delivered"];
        return { ...order, trackingSteps: newSteps, status: statusMap[stepIndex] || order.status };
      })
    );
  };

  const getUserOrders = (userId) => orders.filter((o) => o.userId === userId);

  return (
    <OrderContext.Provider value={{ orders, placeOrder, updateOrderStatus, getUserOrders }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be used within OrderProvider");
  return ctx;
};
