import { useLoaderData } from 'react-router-dom';

import classes from './ProductDetails.module.css';

import SearchBar from '../../../components/SearchBar/SearchBar';
import PhotoContainer from '../../../components/PhotoContainer/PhotoContainer';
import ProductDescription from '../../../components/ProductDescription/ProductDescription';
import { getProductById } from '../../../utils/product';

export default function ProductDetailsPage() {
  const data = useLoaderData();
  const { name, price, image: images, id } = data;

  return (
    <>
      <SearchBar />
      <div className={classes.container}>
        <div className={classes['name-price-row']}>
          <h1>{name}</h1>
          <h3>{price} грн.</h3>
        </div>
        <PhotoContainer images={images} />
        <ProductDescription data={data} />
      </div>
    </>
  );
}

export async function loader({ params }) {
  const id = params.productId;
  const prodData = await getProductById(id);
  return prodData;
}
