import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Login from "./login/Login";

const PrivateRoutes = () => {
  const { isLoading, isAuthenticated } = useSelector(
    (state) => state.clientReducer
  );

  return !isLoading && (isAuthenticated ? <Outlet /> : <Login />);
};

export default PrivateRoutes;
