export const checkAccessToken = async () => {
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

    if (response.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const checkRefreshToken = async () => {
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
