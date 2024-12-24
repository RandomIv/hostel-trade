const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/';

export const ensureAccessToken = async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    const refreshSuccess = await refreshToken();
    return refreshSuccess;
  }

  const response = await fetch(BASE_URL + 'protect', {
    method: 'GET',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    return true;
  } else {
    const refreshSuccess = await refreshToken();
    return refreshSuccess;
  }
};

export const refreshToken = async () => {
  const response = await fetch(BASE_URL + 'refresh', {
    method: 'GET',
    credentials: 'include',
  });

  const res = await response.json();
  const token = res.data?.token;

  if (response.ok && token) {
    localStorage.setItem('token', token);
    return true;
  } else {
    console.error('Failed to fetch data:', res.data);
    return false;
  }
};

export async function logout() {
  const response = await fetch(BASE_URL + 'logout', {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to log out');
  }

  return await response.json();
}

export function getAuthToken() {
  const token = localStorage.getItem('token');
  return token;
}

export function tokenLoader() {
  return getAuthToken();
}

export function loginErrorHandle(error) {
  if (
    error.message === 'JSON object requested, multiple (or no) rows returned'
  ) {
    return 'Неправильний email, login або пароль';
  } else {
    return error.message;
  }
}
