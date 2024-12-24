export const confirmEmail = async ({ signal, token }) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/activate?token=${token}`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (email, token) => {
  try {
    const response = await fetch('http://localhost:5000/api/forgot-password', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email }),
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const saveNewPassword = async (password, token) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/reset-password?token=${token}`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password }),
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};
