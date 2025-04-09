import React, {useState, useEffect} from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = () => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const isAuthenticated = token !== null && token !== undefined && token !== "";

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  } else {
    return <Navigate to="/perfil" replace />;
  }

};