import { Navigate } from "react-router-dom";
import { getToken } from "../services/token-service";

export default function ProtectedRoute({ children }) {
  const token = getToken();

  if (!token) {
    // If no token, redirect to login
    return <Navigate to="/" replace />;
  }

  // If token exists, allow access
  return children;
}
