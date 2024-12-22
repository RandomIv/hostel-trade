import { Navigate, Outlet } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

export default function ProtectedRoute() {
  const { isAuthenticated, isLoading, error } = useAuth();

  if (error) return <div>{error.message}</div>;
  if (isLoading) return <div>Зачекайте хвильку...</div>;

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth?mode=login" />;
}
