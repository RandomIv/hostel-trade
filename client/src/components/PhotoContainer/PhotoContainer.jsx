import classes from './PhotoContainer.module.css';
import emptyPhoto from '../../assets/empty-photo-image.jpg';

export default function PhotoContainer({ image }) {
  const imageUrl = image.length !== 0 ? image[0].url : emptyPhoto;

  return (
    <>
      <div className={classes['photo-container']}>
        <button className={classes['photo-btn']}>
          <i className="fa-solid fa-arrow-left" />
        </button>
        <img src={imageUrl} alt="product-image" />
        <button className={classes['photo-btn']}>
          <i className="fa-solid fa-arrow-right" />
        </button>
      </div>
    </>
  );
}
