export async function getProductById(id) {
  const response = await fetch(`http://localhost:5000/api/product/${id}`);

  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: 'Could not fetch product.' }),
      {
        status: 500,
      }
    );
  } else {
    const res = await response.json();
    const resData = res.data.product;
    return resData;
  }
}

export async function getProducts() {
  const params = new URLSearchParams({
    filter: JSON.stringify({
      name: null,
      price: { min: null, max: null },
      typeId: null,
      hostel: null,
    }),
    sort: JSON.stringify({ price: null, date: null }),
  });

  const url = `http://localhost:5000/api/product?${params.toString()}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Response Error:', response);
      throw new Error('Failed to fetch products');
    }

    const res = await response.json();
    return res.data?.products || [];
  } catch (error) {
    console.error('Fetch Error:', error);
    return [];
  }
}
