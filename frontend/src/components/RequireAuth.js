import { useUserContext } from "../contexts/user"
import { Navigate } from 'react-router-dom'

export default function RequireAuth({ children }) {
  const { user } = useUserContext();

  return (user && Object.keys(user).length) ? children : <Navigate to="/login" replace />;
}