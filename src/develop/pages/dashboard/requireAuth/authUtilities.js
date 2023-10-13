// import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthValues } from '../../../context/authContext';

const RequireAuth = ({ children }) => {
  const { loggedIn } = useAuthValues();
  const location = useLocation();
  
  return !loggedIn ? (
    <Navigate to="/login" replace={true} state={{ path: location.pathname }} />
  ) : children;
}

export default RequireAuth;