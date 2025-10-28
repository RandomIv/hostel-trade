export async function sendRequest({
  url,
  method = 'POST',
  body = {},
  headers = {},
}) {
  try {
    const defaultHeaders = { 'Content-Type': 'application/json' };
    const mergedHeaders = { ...defaultHeaders, ...headers };

    const response = await fetch(url, {
      method,
      headers: mergedHeaders,
      body: Object.keys(body).length > 0 ? body : undefined,
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        error.message || 'An error occurred while processing your request.'
      );
    }

    return await response.json();
  } catch (error) {
    console.error('Request failed:', error.message);
    throw error;
  }
}
