import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "https://quick-compare-backend.vercel.app/api",
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("qc_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;