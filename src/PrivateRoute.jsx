import { Navigate } from "react-router-dom";

export default function PrivateRoute({ component }) {
  const isAuthenticated = true; // Ganti sesuai logika login kamu

  return isAuthenticated ? component : <Navigate to="/login" />;
}
