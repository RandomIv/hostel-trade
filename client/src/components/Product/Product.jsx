import { Link } from 'react-router-dom';

import classes from './Product.module.css';
import emptyPhoto from '../../assets/empty-photo-image.jpg';
import { convertDate } from '../../utils/dataConvert';

export default function Product({ data }) {
  const {
    id,
    user_id,
    name,
    price,
    description,
    created_at,
    updated_at,
    is_active,
    views_count,
    image,
  } = data;

  const category = data.type.name;

  const imageUrl = image.length !== 0 ? image[0].url : emptyPhoto;

  const formattedDate = convertDate(created_at);

  return (
    <Link to={`/product/${id}`} className={classes.link}>
      <div className={classes['product-container']}>
        <div className={classes['inner-container']}>
          <div className={classes['image-container']}>
            <img src={imageUrl} alt="product-image" />
          </div>

          <div className={classes['details-price-container']}>
            <div className={classes['details-container']}>
              <h3>{name}</h3>
              <div>
                <span className={classes.category}>{category}</span>
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
