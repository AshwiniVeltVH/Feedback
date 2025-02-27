import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredPermission?: string;
}

const ProtectedRoute = ({
  children,
  requiredPermission,
}: ProtectedRouteProps) => {
  const { user, loading, hasPermission } = useAuth();

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (requiredPermission && !hasPermission(user, requiredPermission as any)) {
    // Redirect to appropriate page based on role
    if (user.roles.includes("admin")) {
      return <Navigate to="/question-module" replace />;
    } else {
      return <Navigate to="/user-details" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
