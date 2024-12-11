import classes from './SearchPage.module.css';

import SearchBar from '../../components/SearchBar/SearchBar';
import Product from '../../components/Product/Product';
import { getProducts } from '../../utils/product';
import { useLoaderData } from 'react-router-dom';

export default function SearchPage() {
  const products = useLoaderData();

  return (
    <>
      <SearchBar />
      <div className={classes.container}>
        {products.map((product) => {
          return <Product key={product.id} data={product} />;
        })}
      </div>
    </>
  );
}

export async function loader() {
  const productsData = await getProducts();
  return productsData;
}
