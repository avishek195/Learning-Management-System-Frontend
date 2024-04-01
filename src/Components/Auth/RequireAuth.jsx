import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import Denied from "../../Pages/Denied";

const RequireAuth = ({ allowedRoles }) => {
  const { isLoggedIn, role } = useSelector((state) => state.auth);

  isLoggedIn && allowedRoles.find((myrole) => myrole == role) ? (
    <Outlet />
  ) : isLoggedIn ? (
    <Navigate to="/denied" />
  ) : (
    <Navigate to="login" />
  );
};

export default RequireAuth;
