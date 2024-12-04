import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';

const checkAccessToken = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    const response = await fetch('http://localhost:5000/api/protect', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      console.log('Protected data:', data);
      return true;
    } else {
      console.error('Failed to fetch data:', data);
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};
const checkRefreshToken = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/refresh', {
      method: 'GET',
      credentials: 'include',
    });
    const data = await response.json();
    if (response.ok && data.token) {
      localStorage.setItem('token', data.token);
      console.log('Refresh Token:', data);
      return true;
    } else {
      console.error('Failed to fetch data:', data);
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};
export default function ProtectedRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const authenticate = async () => {
    if ((await checkAccessToken()) || (await checkRefreshToken())) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  };
  useEffect(() => {
    authenticate().catch((error) => {
      console.error(error);
    });
  }, []);
  if (loading) return <div>Loading...</div>;
  return isAuthenticated ? <Outlet /> : <Navigate to="/auth?mode=login" />;
}
