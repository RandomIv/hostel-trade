import { useLoaderData } from 'react-router-dom';

import classes from './ProductDetails.module.css';

import PhotoContainer from '../../components/PhotoContainer/PhotoContainer';
import ProductDescription from '../../components/ProductDescription/ProductDescription';
import ProductUserDetails from '../../components/ProductUserDetails/ProductUserDetails';

import { getProductById, getUserInfo } from '../../utils/product';

export default function ProductDetailsPage() {
  const { prodData, userData } = useLoaderData();
  const { name, price, image: images } = prodData;

  return (
    <div className={classes.container}>
      <div className={classes['name-price-row']}>
        <h1>{name}</h1>
        <div>
          <h3>{price} грн.</h3>
        </div>
      </div>
      <PhotoContainer images={images} />
      <ProductDescription data={prodData} />
      <ProductUserDetails data={userData} />
    </div>
  );
}

export async function loader({ params }) {
  const id = params.productId;
  const prodData = await getProductById(id);
  const userData = await getUserInfo(prodData.user.id);
  return { prodData, userData };
}
