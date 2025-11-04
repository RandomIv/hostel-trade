import { sendRequest } from '../http';
import {
  getFavoritesValidateForm,
  getProductsValidateForm,
} from './productFormData';

export async function getProducts(searchParams) {
  const params = getProductsValidateForm(searchParams);
  try {
    const { data } = await sendRequest({
      url: `http://localhost:5000/api/product?${params.toString()}`,
      method: 'GET',
    });
    return data?.products || [];
  } catch (error) {
    console.error('Error fetching products:', error);
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

export async function getFavoriteProducts(searchParams) {
  const params = getFavoritesValidateForm(searchParams);

  const token = localStorage.getItem('token');

  try {
    const { data } = await sendRequest({
      url: `http://localhost:5000/api/favorite?${params.toString()}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const products = data?.favorites.map((favorite) => favorite.product);
    return products || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export function postNewFavorite({ userId, productId, token }) {
  return sendRequest({
    url: 'http://localhost:5000/api/favorite',
    method: 'POST',
    body: JSON.stringify({
      userId: userId,
      productId: productId,
    }),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function deleteFavorite({ userId, productId, token }) {
  return sendRequest({
    url: `http://localhost:5000/api/favorite/${userId}`,
    method: 'DELETE',
    body: JSON.stringify({
      productId: productId,
    }),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
