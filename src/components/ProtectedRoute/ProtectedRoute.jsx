import { Navigate } from "react-router-dom";
import { login } from "../../utils/paths";

function ProtectedRoute({ element: Component, navigate = login, ...props }) {
  return props.isLoggedIn ? (
    <Component {...props} />
  ) : (
    <Navigate to={navigate} replace />
  );
}

export default ProtectedRoute;
