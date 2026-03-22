import api from "./axios";

// GET USERS
export const getUsers = async () => {
  const res = await api.get("/users");
  return res.data;
};

// UPDATE ORDER STATUS
export const updateOrderStatusApi = async (orderId, status) => {
  const res = await api.post("/orders/status", {
    orderId,
    status,
  });
  return res.data;
};