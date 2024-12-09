import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("ProtectedRoute: 토큰 없음 -> /login 이동");
    return <Navigate to="/login" replace />;
  }

  console.log("ProtectedRoute: 토큰 확인됨 -> 해당 페이지 접근 허용");
  return children;
};

export default ProtectedRoute;