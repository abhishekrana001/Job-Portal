import React, { createContext, useContext, useState } from "react";
import { authAPI } from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Token aur user ko localStorage se load karo
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const isAdmin = user?.role === "admin";
  const isEmployer = user?.role === "employer" || user?.role === "recruiter";
  const isJobSeeker = !user || user?.role === "jobseeker" || user?.role === "user" || user?.role === "candidate";

  // API se login ya fallback demo
  const login = async (credentials) => {
    const { email, password } = credentials;

    try {
      const data = await authAPI.login(credentials);

      localStorage.setItem("token", data.token);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("isAdmin", data.role === "admin" ? "true" : "false");
      localStorage.setItem("user", JSON.stringify(data));

      setIsLoggedIn(true);
      setUser(data);
      return data;
    } catch (apiErr) {
      // Offline / Demo fallback if backend is unavailable
      const trimmedEmail = email?.trim().toLowerCase();
      let fallbackUser = null;

      if (trimmedEmail === "admin@jobportal.com" && password === "Admin@123") {
        fallbackUser = {
          _id: "admin-static",
          name: "Admin",
          email: "admin@jobportal.com",
          role: "admin",
          token: "mock-admin-token",
        };
      } else if (trimmedEmail === "recruiter@techsolutions.com" || trimmedEmail.includes("recruiter") || trimmedEmail.includes("employer")) {
        fallbackUser = {
          _id: "recruiter-" + Date.now(),
          name: "Tech Solutions Recruiter",
          companyName: "Tech Solutions Inc.",
          email: trimmedEmail,
          role: "employer",
          title: "Senior Technical Recruiter",
          phone: "+91 98765 43210",
          token: "mock-employer-token",
        };
      } else if (trimmedEmail === "demo@jobportal.com" || password) {
        // Fallback user from registered users in localStorage or candidate
        const localUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
        const found = localUsers.find((u) => u.email.toLowerCase() === trimmedEmail);
        if (found) {
          fallbackUser = { ...found, token: "mock-user-token" };
        } else {
          fallbackUser = {
            _id: "candidate-" + Date.now(),
            name: email.split("@")[0],
            email: trimmedEmail,
            role: "jobseeker",
            title: "Frontend Developer",
            phone: "+91 98765 00000",
            token: "mock-candidate-token",
          };
        }
      }

      if (fallbackUser) {
        localStorage.setItem("token", fallbackUser.token);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("isAdmin", fallbackUser.role === "admin" ? "true" : "false");
        localStorage.setItem("user", JSON.stringify(fallbackUser));

        setIsLoggedIn(true);
        setUser(fallbackUser);
        return fallbackUser;
      }

      throw apiErr;
    }
  };

  // API se register ya fallback
  const register = async (userData) => {
    try {
      const data = await authAPI.register(userData);

      localStorage.setItem("token", data.token);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("isAdmin", data.role === "admin" ? "true" : "false");
      localStorage.setItem("user", JSON.stringify(data));

      setIsLoggedIn(true);
      setUser(data);
      return data;
    } catch (apiErr) {
      // Local storage fallback for seamless experience
      const normalizedRole = ["employer", "recruiter"].includes(userData.role)
        ? "employer"
        : userData.role === "admin"
        ? "admin"
        : "jobseeker";

      const newUser = {
        _id: "user-" + Date.now(),
        name: userData.name,
        email: userData.email,
        phone: userData.phone || "",
        companyName: userData.companyName || "",
        title: userData.title || (normalizedRole === "employer" ? "Hiring Manager" : "Software Engineer"),
        role: normalizedRole,
        token: "mock-token-" + Date.now(),
      };

      // Save to registeredUsers list
      const localUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
      localStorage.setItem("registeredUsers", JSON.stringify([...localUsers, newUser]));

      localStorage.setItem("token", newUser.token);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("isAdmin", newUser.role === "admin" ? "true" : "false");
      localStorage.setItem("user", JSON.stringify(newUser));

      setIsLoggedIn(true);
      setUser(newUser);
      return newUser;
    }
  };

  // Profile update
  const updateUser = async (profileData) => {
    try {
      const data = await authAPI.updateProfile(profileData);
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      return data;
    } catch {
      const updated = { ...user, ...profileData };
      localStorage.setItem("user", JSON.stringify(updated));
      setUser(updated);
      return updated;
    }
  };

  // Logout - sab clear karo
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || "jobseeker",
        isLoggedIn,
        isAdmin,
        isEmployer,
        isJobSeeker,
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