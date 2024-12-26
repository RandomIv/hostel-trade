import { ensureAccessToken } from './auth';

export const getUserByToken = async () => {
  try {
    await ensureAccessToken();
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
    const token = localStorage.getItem('token');
    console.log(formData);

    const response = await fetch(`http://localhost:5000/api/me`, {
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
export const uploadAvatar = async (file, id, prevUrl) => {
  const token = localStorage.getItem('token');
  const formData = new FormData();
  formData.append('image', file);
  formData.append('id', id);
  formData.append('prevUrl', prevUrl);
  formData.append('bucket', 'avatars');
  const response = await fetch('http://localhost:5000/api/image/upload', {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  });

  const result = await response.json();
  return result.data.url;
};
