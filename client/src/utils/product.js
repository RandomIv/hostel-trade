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

export async function getProducts(searchParams) {
  const parseParams = (param) => (param ? param.split(',') : null);

  const filter = {
    name: searchParams.get('name') || null,
    price: {
      min: searchParams.get('min') || null,
      max: searchParams.get('max') || null,
    },
    typeId: parseParams(searchParams.get('typeId')),
    hostelId: parseParams(searchParams.get('hostelId')),
  };

  const [sortKey, sortValue] = searchParams.get('sort')?.split('-') || [
    null,
    null,
  ];
  const sort = {
    price: null,
    date: null,
    [sortKey]: sortValue,
  };

  const params = new URLSearchParams({
    filter: JSON.stringify(filter),
    sort: JSON.stringify(sort),
  });

  const url = `http://localhost:5000/api/product?${params.toString()}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      console.error('Response Error:', response);
      throw new Error('Failed to fetch products');
    }

    const { data } = await response.json();
    return data?.products || [];
  } catch (error) {
    console.error('Fetch Error:', error);
    return [];
  }
}

export async function getUserInfo(userId) {
  try {
    const response = await fetch(`http://localhost:5000/api/user/${userId}`);

    if (!response.ok) {
      console.error('Response Error:', response);
      throw new Error('Failed to fetch userInfo');
    }

    const res = await response.json();
    return res.data?.user || [];
  } catch (error) {
    console.error('Fetch Error:', error);
    return [];
  }
}

export async function getHostels() {
  try {
    const response = await fetch(`http://localhost:5000/api/hostel`);

    if (!response.ok) {
      console.error('Response Error:', response);
      throw new Error('Failed to fetch hostels');
    }

    const res = await response.json();
    return res.data?.hostels || [];
  } catch (error) {
    console.error('Fetch Error:', error);
    return [];
  }
}

export async function getTypes() {
  try {
    const response = await fetch(`http://localhost:5000/api/type`);

    if (!response.ok) {
      console.error('Response Error:', response);
      throw new Error('Failed to fetch types');
    }

    const res = await response.json();
    return res.data?.types || [];
  } catch (error) {
    console.error('Fetch Error:', error);
    return [];
  }
}
