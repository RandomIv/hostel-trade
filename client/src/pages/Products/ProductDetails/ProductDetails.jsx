import { useLoaderData } from 'react-router-dom';

import classes from './ProductDetails.module.css';

import SearchBar from '../../../components/SearchBar/SearchBar';
import PhotoContainer from '../../../components/PhotoContainer/PhotoContainer';
import ProductDescription from '../../../components/ProductDescription/ProductDescription';

export default function ProductDetailsPage() {
  const data = useLoaderData();

  return (
    <div className={classes['background']}>
      <SearchBar />
      <div className={classes.container}>
        <div className={classes['name-price-row']}>
          <h1>{data.name}</h1>
          <h3>{data.price} грн.</h3>
        </div>
        <PhotoContainer image={data.image} />
        <ProductDescription data={data} />
      </div>
    </div>
  );
}

export function loader() {
  return {
    id: 9,
    user_id: 52,
    name: 'кышечка',
    price: 666,
    type_id: 2,
    description:
      'silly cat silly cat silly cat silly cat silly cat silly cat silly cat silly cat silly cat',
    created_at: '2024-12-09T16:38:18.712995',
    updated_at: '2024-12-09T16:38:18.712995',
    is_active: true,
    views_count: 0,
    image: [
      {
        id: 1,
        url: 'https://preview.redd.it/ktxuj7clhbkb1.jpg?width=1179&format=pjpg&auto=webp&s=b1afe6e579a3c3416659d16b039824e7b0dde873',
        is_main: true,
        created_at: '2024-12-09T15:34:27.66869',
        product_id: 8,
      },
    ],
  };
}
