import { Link } from 'react-router-dom';

import classes from './Product.module.css';
import emptyPhoto from '../../assets/empty-photo-image.jpg';

export default function Product({ data }) {
  const {
    id,
    user_id,
    name,
    price,
    type_id: type,
    description,
    created_at,
    updated_at,
    is_active,
    views_count,
    image,
  } = data;

  const imageUrl = image.length !== 0 ? image[0].url : emptyPhoto;

  const date = new Date(created_at);
  const formattedDate = date.toLocaleDateString();

  return (
    <Link to={`/product/${id}`} className={classes.link}>
      <div className={classes['product-container']}>
        <div className={classes['inner-container']}>
          <img src={imageUrl} alt="product-image" />

          <div className={classes['details-price-container']}>
            <div className={classes['details-container']}>
              <h3>{name}</h3>
              <div>
                <span className={classes.category}>{type}</span>
              </div>
              <p>{formattedDate}</p>
            </div>
            <p className={classes.price}>{price} грн.</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
