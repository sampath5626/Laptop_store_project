import { Navigate } from "react-router-dom";
import { getCurrentUser, isAdmin } from "../services/auth";

function ProtectedRoute({ children, adminOnly = false }) {
  const user = getCurrentUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin(user)) {
    return <Navigate to="/laptops" replace />;
  }

  return children;
}

export default ProtectedRoute;
