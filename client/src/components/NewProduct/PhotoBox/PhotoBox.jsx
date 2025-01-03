import { useState } from 'react';

import classes from '../NewProduct.module.css';

import photoClasses from './PhotoBox.module.css';
import downloadIco from '../../../assets/download-ico.png';
import cameraIco from '../../../assets/camera-icon.png';
import PhotoContainer from '../../PhotoContainer/PhotoContainer';
import { uploadProductImage } from '../../../utils/photos';

export default function PhotoBox({ prodData }) {
  const [displayPhotos, setDisplayPhotos] = useState(null);

  const { image: images = [] } = prodData || {};
  const photos = images.map((image) => image?.url || null);

  const [photoUrls, setPhotoUrls] = useState(photos);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const url = await uploadProductImage(file, Date.now().toString(36));
      if (!url) throw new Error('No file uploaded');
      setPhotoUrls((prev) => [...prev, url]);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

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
          {photoUrls.map((photo, index) => (
            <div key={`photo-${index}`} className={photoClasses['photo-box']}>
              <img
                src={photo ? photo : cameraIco}
                alt={photo ? 'photo-image' : 'camera-image'}
                className={photo ? photoClasses['active-img'] : ''}
                onClick={photo ? handleImageClick : null}
              />
              <input
                type="text"
                value={photoUrls[index]}
                name={`photo-${index}`}
                readOnly
                style={{ display: 'none' }}
              />
            </div>
          ))}

          <input
            type="file"
            id="display-photo"
            name="display-photo"
            className={photoClasses['file-btn']}
            onChange={handleFileChange}
          />
          <label
            htmlFor="display-photo"
            className={photoClasses['custom-file-btn']}
          >
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
