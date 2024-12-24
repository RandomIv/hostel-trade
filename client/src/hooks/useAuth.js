import { useEffect, useState } from 'react';
import { ensureAccessToken } from '../utils/auth';

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const authenticate = async () => {
    if (await ensureAccessToken()) {
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
