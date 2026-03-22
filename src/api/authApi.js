import api from "./axios";

// 🔐 LOGIN
export const loginUser = async (email, password) => {
  try {
    const res = await api.post("/auth/login", {
      email,
      password,
    });

    return res.data;
  } catch (err) {
    return {
      error: true,
      msg: err.response?.data?.msg || "Login failed",
    };
  }
};

// 🔐 REGISTER
export const registerUser = async (name, email, password) => {
  try {
    const res = await api.post("/auth/register", {
      name,
      email,
      password,
    });

    return res.data;
  } catch (err) {
    return {
      error: true,
      msg: err.response?.data?.msg || "Registration failed",
    };
  }
};