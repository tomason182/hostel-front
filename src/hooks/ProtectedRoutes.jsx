import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function ProtectedRoutes({ isAuthenticated }) {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const result = await isAuthenticated();
      setIsAuth(result);
    };

    checkAuth();
  }, [isAuthenticated]);

  if (isAuth === null) {
    return <div>Loading...</div>;
  }

  return isAuth ? <Outlet /> : <Navigate to="/accounts/login" />;
}

ProtectedRoutes.propTypes = {
  isAuthenticated: PropTypes.func.isRequired,
};
