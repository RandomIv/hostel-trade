import { useEffect, useState } from 'react';
import { checkAccessToken, checkRefreshToken } from '../utils/auth';

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const authenticate = async () => {
    if ((await checkAccessToken()) || (await checkRefreshToken())) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    authenticate().catch((error) => {
      setError({
        message: error.message || 'Не вдалося автентифікувати користувача...',
      });
    });
  }, []);

  return {
    isAuthenticated,
    isLoading,
    error,
  };
}
