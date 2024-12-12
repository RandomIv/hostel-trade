import classes from './SearchPage.module.css';

import SearchBar from '../../components/SearchBar/SearchBar';
import Product from '../../components/Product/Product';
import { getProducts } from '../../utils/product';
import {
  redirect,
  useActionData,
  useFormAction,
  useLoaderData,
  useSearchParams,
} from 'react-router-dom';

export default function SearchPage() {
  const products = useLoaderData();

  return (
    <>
      <SearchBar />
      <div className={classes.container}>
        {products.length > 0 ? (
          products.map((product) => {
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
  return productsData;
}

export async function action({ request }) {
  const formData = await request.formData();
  const searchParams = new URLSearchParams();

  for (const [key, value] of formData.entries()) {
    if (value) searchParams.set(key, value);
  }

  return redirect(`?${searchParams.toString()}`);
}
