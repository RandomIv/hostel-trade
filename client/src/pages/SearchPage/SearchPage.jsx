import { redirect, useLoaderData } from 'react-router-dom';

import {
  getProducts,
  getHostels,
  getTypes,
} from '../../utils/product/productRequests';
import SearchProducts from '../../components/SearchProducts/SearchProducts';

export default function SearchPage() {
  const { productsData, hostelsData, typesData } = useLoaderData();

  return (
    <SearchProducts
      productsData={productsData}
      hostelsData={hostelsData}
      typesData={typesData}
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
  return { productsData, hostelsData, typesData };
}

export async function action({ request }) {
  const formData = await request.formData();
  const searchParams = new URLSearchParams();

  for (const [key, value] of formData.entries()) {
    if (value) searchParams.set(key, value);
  }

  return redirect(`?${searchParams.toString()}`);
}
