import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectAuthToken } from "../redux/selectors";

const ProtectedRoute = () => {
  const token = useSelector(selectAuthToken);

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
