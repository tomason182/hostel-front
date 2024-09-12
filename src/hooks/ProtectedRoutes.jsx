import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

export default function ProtectedRoutes({ isAuthenticated }) {
  return isAuthenticated ? <Outlet /> : <Navigate to="/accounts/login" />;
}

ProtectedRoutes.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

ProtectedRoutes.defaultProps = {
  isAuthenticated: false,
};
