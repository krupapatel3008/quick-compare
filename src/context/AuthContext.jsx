import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(undefined);

const USERS_KEY = "qc_users";
const CURRENT_USER_KEY = "qc_current_user";

const getStoredUsers = () => {
  const data = localStorage.getItem(USERS_KEY);
  if (!data) {
    // Seed with admin user
    const admin = {
      id: "admin-001",
      name: "Admin",
      email: "admin@quickcompare.com",
      password: "admin123",
      role: "admin",
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem(USERS_KEY, JSON.stringify([admin]));
    return [admin];
  }
  return JSON.parse(data);
};

const saveUsers = (users) => localStorage.setItem(USERS_KEY, JSON.stringify(users));

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(getStoredUsers);
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem(CURRENT_USER_KEY);
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => saveUsers(users), [users]);
  useEffect(() => {
    if (currentUser) localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
    else localStorage.removeItem(CURRENT_USER_KEY);
  }, [currentUser]);

  const login = (email, password) => {
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) return { success: false, message: "Invalid email or password" };
    setCurrentUser(user);
    return { success: true, user };
  };

  const register = (name, email, password) => {
    if (users.find((u) => u.email === email))
      return { success: false, message: "Email already registered" };
    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      password,
      role: "user",
      createdAt: new Date().toISOString(),
    };
    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => setCurrentUser(null);

  const isAdmin = currentUser?.role === "admin";
  const isLoggedIn = !!currentUser;

  return (
    <AuthContext.Provider value={{ currentUser, users, login, register, logout, isAdmin, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
