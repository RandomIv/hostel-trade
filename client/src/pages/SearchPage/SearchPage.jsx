import { redirect, useLoaderData } from 'react-router-dom';

import {
  getProducts,
  getHostels,
  getTypes,
  getFavoriteProducts,
} from '../../utils/product/productRequests';
import SearchProducts from '../../components/SearchProducts/SearchProducts';
import { ensureAccessToken } from '../../utils/auth';

export default function SearchPage() {
  const { productsData, hostelsData, typesData, favoritesData } =
    useLoaderData();

  return (
    <SearchProducts
      productsData={productsData}
      hostelsData={hostelsData}
      typesData={typesData}
      favoritesData={favoritesData}
      userId={''}
    />
  );
}

export async function loader({ request }) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const productsData = await getProducts(searchParams);
  const hostelsData = await getHostels();
  const typesData = await getTypes();

  const userId = localStorage.getItem('userId');
  let favoritesData;

  if (userId) {
    await ensureAccessToken();
    const favoritesParams = new URLSearchParams();
    favoritesParams.set('userId', userId);
    favoritesData = await getFavoriteProducts(favoritesParams);
  }

  return { productsData, hostelsData, typesData, favoritesData };
}

export async function action({ request }) {
  const formData = await request.formData();
  const searchParams = new URLSearchParams();

  for (const [key, value] of formData.entries()) {
    if (value) searchParams.set(key, value);
  }

  return redirect(`?${searchParams.toString()}`);
}
