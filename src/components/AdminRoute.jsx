import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminRoute({ children }) {
  const { isLoggedIn, isAdmin, isEmployer } = useAuth();

  if (!isLoggedIn || (!isAdmin && !isEmployer)) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
