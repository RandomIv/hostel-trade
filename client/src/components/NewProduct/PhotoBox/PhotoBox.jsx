import { useState } from 'react';

import classes from '../NewProduct.module.css';

import photoClasses from './PhotoBox.module.css';
import downloadIco from '../../../assets/download-ico.png';
import cameraIco from '../../../assets/camera-icon.png';
import PhotoContainer from '../../PhotoContainer/PhotoContainer';

export default function PhotoBox({ prodData }) {
  const [displayPhotos, setDisplayPhotos] = useState(null);

  const { image: images = [] } = prodData || {};
  const photos = Array(7)
    .fill(null)
    .map((_, index) => images[index]?.url || null);

  function handleImageClick() {
    setDisplayPhotos(true);
  }

  return (
    <>
      <div
        className={photoClasses['display-img-box-bg']}
        hidden={!displayPhotos}
      >
        <p>
          <button
            type="button"
            className={photoClasses['close-display-btn']}
            onClick={() => setDisplayPhotos(false)}
          >
            <i className="fa-solid fa-x" />
          </button>
        </p>

        <div className={photoClasses['display-img-box']}>
          <PhotoContainer images={images} fullscreen={true}></PhotoContainer>
        </div>
      </div>
      <div className={classes['box']}>
        <div className={photoClasses['photo-title']}>
          <h2>Фото </h2>
          <div>
            <span>{'Перше фото буде на обкладинці'}</span>
          </div>
        </div>

        <div className={photoClasses['row-grid']}>
          {photos.map((photo, index) => {
            return (
              <div key={index} className={photoClasses['photo-box']}>
                <img
                  src={photo ? photo : cameraIco}
                  alt={photo ? 'photo-image' : 'camera-image'}
                  className={photo ? photoClasses['active-img'] : ''}
                  onClick={photo ? handleImageClick : null}
                />
              </div>
            );
          })}

          <input
            type="file"
            id="photo"
            name="photo"
            className={photoClasses['file-btn']}
          />
          <label htmlFor="photo" className={photoClasses['custom-file-btn']}>
            <div className={photoClasses['custom-file-btn-div']}>
              <div>
                <img src={downloadIco} alt="download-ico" />
                <p>Додати зображення</p>
              </div>
            </div>
          </label>
        </div>
      </div>
    </>
  );
}
