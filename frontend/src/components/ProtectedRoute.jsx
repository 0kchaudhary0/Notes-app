import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Only lets logged-in users see the page, others are sent to /login
function ProtectedRoute({ children }) {
  const { token } = useSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
