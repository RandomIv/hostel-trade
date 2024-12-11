import classes from './PhotoContainer.module.css';
import emptyPhoto from '../../assets/empty-photo-image.jpg';
import { useState } from 'react';

export default function PhotoContainer({ images }) {
  const [imageIndex, setImageIndex] = useState(0);

  function handlePrevBtnClick() {
    setImageIndex((prev) => {
      return prev !== 0 ? prev - 1 : images.length - 1;
    });
  }

  function handleNextBtnClick() {
    setImageIndex((prev) => {
      return prev !== images.length - 1 ? prev + 1 : 0;
    });
  }

  const imageUrl = images.length !== 0 ? images[imageIndex].url : emptyPhoto;

  return (
    <>
      <div className={classes['photo-container']}>
        <button className={classes['photo-btn']} onClick={handlePrevBtnClick}>
          <i className="fa-solid fa-arrow-left" />
        </button>
        <img src={imageUrl} alt="product-image" />
        <button className={classes['photo-btn']} onClick={handleNextBtnClick}>
          <i className="fa-solid fa-arrow-right" />
        </button>
      </div>
    </>
  );
}
