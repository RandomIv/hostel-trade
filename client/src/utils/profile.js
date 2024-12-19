import { checkRefreshToken } from './auth';

export const getUserByToken = async () => {
  try {
    await checkRefreshToken();
    const token = localStorage.getItem('token');

    const response = await fetch('http://localhost:5000/api/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    });

    const { data: resData } = await response.json();
    const userId = resData.user.id;

    localStorage.setItem('userId', userId);
    return resData;
  } catch (error) {
    console.log(error);
    return {
      error: true,
      message: error.message || 'An unexpected error occurred.',
      status: 500,
    };
  }
};
export const updateUserProfile = async (user) => {
  try {
    const token = localStorage.getItem('token');

    const response = await fetch('http://localhost:5000/api/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    });

    const { data: resData } = await response.json();
    const userId = resData.user.id;

    localStorage.setItem('userId', userId);
    return resData;
  } catch (error) {
    console.log(error);
    return {
      error: true,
      message: error.message || 'An unexpected error occurred.',
      status: 500,
    };
  }
};
