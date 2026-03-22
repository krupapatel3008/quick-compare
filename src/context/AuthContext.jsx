import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, registerUser } from "@/api/authApi";

const AuthContext = createContext(null);

const TOKEN_KEY = "qc_token";
const USER_KEY = "qc_user";

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem(USER_KEY);
    return saved ? JSON.parse(saved) : null;
  });

  const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY));

  useEffect(() => {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  }, [token]);

  useEffect(() => {
    if (currentUser)
      localStorage.setItem(USER_KEY, JSON.stringify(currentUser));
    else localStorage.removeItem(USER_KEY);
  }, [currentUser]);

  // 🔐 LOGIN
  const login = async (email, password) => {
    try {
      const data = await loginUser(email, password);

      if (!data.token) {
        return { success: false, message: data.msg || "Login failed" };
      }

      setToken(data.token);
      setCurrentUser(data.user);

      return { success: true, user: data.user };
    } catch (err) {
      return { success: false, message: "Server error" };
    }
  };

  // 🔐 REGISTER
  const register = async (name, email, password) => {
    try {
      const data = await registerUser(name, email, password);

      if (data.error || data.msg === "User already exists") {
        return { success: false, message: data.msg };
      }

      // Auto login after register
      return await login(email, password);
    } catch (err) {
      return { success: false, message: "Server error" };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
  };

  const isAdmin = currentUser?.role === "admin";
  const isLoggedIn = !!currentUser;

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        token,
        login,
        register,
        logout,
        isAdmin,
        isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};