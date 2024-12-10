import classes from './SearchPage.module.css';

import SearchBar from '../../components/SearchBar/SearchBar';
import Product from '../../components/Product/Product';

const PRODUCTS = [
  {
    id: 21,
    user_id: 77,
    name: 'Піво',
    price: 999,
    type_id: 3,
    description: 'Дуже вкусне пиво, друг пив - обригав всю кімнату',
    created_at: '2024-12-09T16:39:32.164238',
    updated_at: '2024-12-09T16:39:32.164238',
    is_active: true,
    views_count: 0,
    image: [
      {
        id: 1,
        url: 'https://i.pinimg.com/550x/52/d2/95/52d295d72ddf3436002d709ad8ed89dd.jpg',
        is_main: true,
        created_at: '2024-12-09T15:34:27.66869',
        product_id: 8,
      },
    ],
  },
  {
    id: 9,
    user_id: 52,
    name: 'кышечка',
    price: 666,
    type_id: 2,
    description: null,
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
  },
  {
    id: 8,
    user_id: 37,
    name: 'Викрутка',
    price: 150,
    type_id: '1',
    description: 'Дуже зручна викрутка, кіт насрав на неї, продаю СРОЧНО',
    created_at: '2024-12-01T17:09:12.043659',
    updated_at: '2024-12-01T17:09:12.043659',
    is_active: true,
    views_count: 0,
    image: [
      {
        id: 1,
        url: 'https://www.findmeagift.co.uk/site_media/images/products/p_main/fiz110_happy_stan_multi_screwdriver_1.jpg',
        is_main: true,
        created_at: '2024-12-09T15:34:27.66869',
        product_id: 8,
      },
    ],
  },
];

export default function SearchPage() {
  return (
    <div className={classes['background']}>
      <SearchBar />
      <div className={classes.container}>
        {PRODUCTS.map((product) => {
          return <Product key={product.id} data={product} />;
        })}
      </div>
    </div>
  );
}
