import { Navigate, Outlet } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

export default function ProtectedRoute() {
  const { isAuthenticated, isLoading, error } = useAuth();

  if (isLoading) return <div>Зачекайте хвильку...</div>;
  if (error) return <div>{error.message}</div>;

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth?mode=login" />;
}
