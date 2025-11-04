import classes from './UploadImage.module.css';
import React from 'react';
import edit from '../../assets/edit.png';

const UploadImage = ({ handleFileChange }) => {
  return (
    <>
      <div className={classes['edit-overlay']}>
        <label htmlFor="file-upload">
          <img src={edit} alt="Edit" className={classes['edit-icon']} />
        </label>
      </div>
      <input
        type="file"
        id="file-upload"
        className={classes['file-upload']}
        accept="image/*"
        onChange={handleFileChange}
        hidden
      />
    </>
  );
};

export default UploadImage;
