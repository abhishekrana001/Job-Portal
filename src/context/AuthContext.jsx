import React, { createContext, useContext, useState } from "react";
import { authAPI } from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Token aur user ko localStorage se load karo
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("isAdmin") === "true"
  );

  // API se login
  const login = async (credentials) => {
    const data = await authAPI.login(credentials);

    // Token save karo
    localStorage.setItem("token", data.token);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("isAdmin", data.role === "admin" ? "true" : "false");
    localStorage.setItem("user", JSON.stringify(data));

    setIsLoggedIn(true);
    setIsAdmin(data.role === "admin");
    setUser(data);

    return data;
  };

  // API se register
  const register = async (userData) => {
    const data = await authAPI.register(userData);

    localStorage.setItem("token", data.token);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("isAdmin", "false");
    localStorage.setItem("user", JSON.stringify(data));

    setIsLoggedIn(true);
    setIsAdmin(false);
    setUser(data);

    return data;
  };

  // Profile update
  const updateUser = async (profileData) => {
    const data = await authAPI.updateProfile(profileData);
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
    return data;
  };

  // Logout - sab clear karo
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
    setIsAdmin(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        isAdmin,
        login,
        logout,
        register,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}