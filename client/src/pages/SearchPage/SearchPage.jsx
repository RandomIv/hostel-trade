import {
  redirect,
  useActionData,
  useFormAction,
  useLoaderData,
  useSearchParams,
} from 'react-router-dom';

import classes from './SearchPage.module.css';

import SearchBar from '../../components/SearchBar/SearchBar';
import Product from '../../components/Product/Product';

import { getProducts, getHostels, getTypes } from '../../utils/product';

export default function SearchPage() {
  const { productsData, hostelsData, typesData } = useLoaderData();

  return (
    <>
      <SearchBar hostels={hostelsData} types={typesData} />
      <div className={classes.container}>
        {productsData.length > 0 ? (
          productsData.map((product) => {
            return <Product key={product.id} data={product} />;
          })
        ) : (
          <h2>Немає збігів</h2>
        )}
      </div>
    </>
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
