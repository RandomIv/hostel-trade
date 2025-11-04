import { Link } from 'react-router-dom';

import classes from './Product.module.css';
import emptyPhoto from '../../assets/empty-photo-image.jpg';
import { convertDate } from '../../utils/dataConvert';
import LikeBtn from '../LikeBtn/LikeBtn';

export default function Product({ data, isFavorite }) {
  const { id, name, price, created_at, image, hostel } = data;

  const category = data.type.name;
  const hostel_num = hostel.number;
  const imageUrl = image.length !== 0 ? image[0].url : emptyPhoto;
  const formattedDate = convertDate(created_at);

  return (
    <>
      <div className={classes.container}>
        <Link to={`/product/${id}`} className={classes.link}>
          <div className={classes['product-container']}>
            <div className={classes['inner-container']}>
              <div className={classes['image-container']}>
                <img src={imageUrl} alt="product-image" />
              </div>

              <div className={classes['text-container']}>
                <div className={classes.row}>
                  <h3>{name}</h3>
                  <p className={classes.price}>{price} грн.</p>
                </div>
                <div className={classes.row}>
                  <div>
                    <span className={classes.category}>{category}</span>
                  </div>
                </div>
                <div className={classes.row}>
                  <div className={classes['col-left']}>
                    <span>Гуртожиток №{hostel_num}</span> -
                    <span>{formattedDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
        <div className={classes['like-btn-container']}>
          <LikeBtn productId={id} isLiked={isFavorite} />
        </div>
      </div>
    </>
  );
}
