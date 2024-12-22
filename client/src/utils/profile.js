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
    return resData.user;
  } catch (error) {
    console.log(error);
    return {
      error: true,
      message: error.message || 'An unexpected error occurred.',
      status: 500,
    };
  }
};
export const updateUserProfile = async (formData) => {
  try {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    console.log(formData);

    const response = await fetch(`http://localhost:5000/api/user/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      console.error('Failed to update user', response);
    }
  } catch (error) {
    console.log(error);
    return {
      error: true,
      message: error.message || 'An unexpected error occurred.',
      status: 500,
    };
  }
};
export async function getHostels() {
  try {
    const response = await fetch(`http://localhost:5000/api/hostel`);

    if (!response.ok) {
      console.error('Failed to fetch hostels', response);
    }
    const res = await response.json();
    return res.data?.hostels || [];
  } catch (error) {
    console.error('Fetch Error:', error);
    return [];
  }
}
