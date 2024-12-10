import { useLoaderData } from 'react-router-dom';

import classes from './ProductDetails.module.css';

import SearchBar from '../../../components/SearchBar/SearchBar';
import PhotoContainer from '../../../components/PhotoContainer/PhotoContainer';
import ProductDescription from '../../../components/ProductDescription/ProductDescription';
import { getProductById } from '../../../utils/product';

export default function ProductDetailsPage() {
  const data = useLoaderData();
  const { name, price, image, id } = data;

  return (
    <div className={classes['background']}>
      <SearchBar />
      <div className={classes.container}>
        <div className={classes['name-price-row']}>
          <h1>{name}</h1>
          <h3>{price} грн.</h3>
        </div>
        <PhotoContainer image={image} />
        <ProductDescription data={data} />
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const id = params.productId;
  const prodData = await getProductById(id);
  return prodData;
}
