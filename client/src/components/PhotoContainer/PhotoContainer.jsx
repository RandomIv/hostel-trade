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
      <div className={classes['container']}>
        <button
          className={classes['photo-btn-prev']}
          onClick={handlePrevBtnClick}
        >
          <i className="fa-solid fa-arrow-left" />
        </button>
        <div className={classes['photo-container']}>
          <img src={imageUrl} alt="product-image" />
        </div>
        <button
          className={classes['photo-btn-next']}
          onClick={handleNextBtnClick}
        >
          <i className="fa-solid fa-arrow-right" />
        </button>
      </div>
    </>
  );
}
