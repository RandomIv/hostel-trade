import { sendRequest } from './http';

export async function getProductById(id) {
  try {
    const { data } = await sendRequest({
      url: `http://localhost:5000/api/product/${id}`,
      method: 'GET',
    });
    return data.product;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw new Error('Could not fetch product.');
  }
}

export async function getProducts(searchParams) {
  const parseParams = (param) => (param ? param.split(',') : null);

  const filter = {
    userId: searchParams.get('userId') || null,
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

  try {
    const { data } = await sendRequest({
      url: `http://localhost:5000/api/product?${params.toString()}`,
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    return data?.products || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getUserInfo(userId) {
  try {
    const { data } = await sendRequest({
      url: `http://localhost:5000/api/user/${userId}`,
      method: 'GET',
    });
    return data?.user || [];
  } catch (error) {
    console.error('Error fetching user info:', error);
    return [];
  }
}

export async function getHostels() {
  try {
    const { data } = await sendRequest({
      url: `http://localhost:5000/api/hostel`,
      method: 'GET',
    });
    return data?.hostels || [];
  } catch (error) {
    console.error('Error fetching hostels:', error);
    return [];
  }
}

export async function getTypes() {
  try {
    const { data } = await sendRequest({
      url: `http://localhost:5000/api/type`,
      method: 'GET',
    });
    return data?.types || [];
  } catch (error) {
    console.error('Error fetching types:', error);
    return [];
  }
}

export function postNewProduct({ body, headers }) {
  return sendRequest({
    url: 'http://localhost:5000/api/product',
    method: 'POST',
    body,
    headers,
  });
}

export function deleteProduct(id) {
  return sendRequest({
    url: `http://localhost:5000/api/product/${id}`,
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
}
