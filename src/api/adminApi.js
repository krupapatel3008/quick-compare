import api from "./axios";

// GET USERS
export const getUsers = async () => {
  try {
    const res = await api.get("/users");
    return res.data;
  } catch (err) {
    throw err.response?.data || {msg: "Failed to fetch users."}
  }
};

// UPDATE ORDER STATUS
export const updateOrderStatusApi = async (orderId, status) => {
  try {
    const res = await api.post("/orders/status", {
      orderId,
      status,
    });

    return res.data;
  } catch (err) {
    throw err.response?.data || { msg: "Failed to update order status" };
  }
};