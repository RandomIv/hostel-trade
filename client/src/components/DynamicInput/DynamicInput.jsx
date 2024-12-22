import edit from '../../assets/edit.png';
import classes from './DynamicInput.module.css';
import { useState } from 'react';
export default function DynamicInput({
  children,
  label,
  name,
  handleInputChange,
}) {
  const [isEditMode, setIsEditMode] = useState(false);
  const handleEditClick = () => {
    setIsEditMode((prev) => !prev);
  };
  return (
    <span className={classes['editable-input-container']}>
      {isEditMode ? (
        <input
          className={classes['editable-input']}
          type="text"
          name={name}
          value={label || ''}
          onChange={handleInputChange}
        />
      ) : (
        <span>{children}</span>
      )}
      <img
        onClick={handleEditClick}
        src={edit}
        alt="Edit"
        className={classes['edit-icon']}
      />
    </span>
  );
}
