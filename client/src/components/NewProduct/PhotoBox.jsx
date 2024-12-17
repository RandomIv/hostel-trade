import classes from './NewProduct.module.css';
import downloadIco from '../../assets/download-ico.png';
import cameraIco from '../../assets/camera-icon.png';

export default function PhotoBox() {
  const photos = Array(7).fill(null);

  return (
    <div className={classes['box']}>
      <div className={classes['photo-title']}>
        <h2>Фото </h2>
        <div>
          <span>{'Перше фото буде на обкладинці'}</span>
        </div>
      </div>

      <div className={classes['row-grid']}>
        {photos.map((photo, index) => {
          return (
            <div key={index} className={classes['photo-div']}>
              <img src={photo ? photo : cameraIco} alt="camera-ico" />
            </div>
          );
        })}

        <input
          type="file"
          id="photo"
          name="photo"
          className={classes['file-btn']}
        />
        <label htmlFor="photo" className={classes['custom-file-btn']}>
          <div className={classes['custom-file-btn-div']}>
            <div>
              <img src={downloadIco} alt="download-ico" />
              <p>Додати зображення</p>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
}
