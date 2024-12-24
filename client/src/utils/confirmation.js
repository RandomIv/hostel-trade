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
