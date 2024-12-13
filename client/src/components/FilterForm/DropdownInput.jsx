import { useEffect, useState } from 'react';
import classes from './FilterForm.module.css';

export default function DropdownInput({
  title,
  name,
  data,
  placeholder,
  defaultValue,
  ...props
}) {
  const [selectedIds, setSelectedIds] = useState(defaultValue);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  useEffect(() => {
    setSelectedIds(defaultValue); // Sync with parent state
  }, [defaultValue]);

  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id]
    );
  };

  const handleRadioChange = (id) => {
    setSelectedIds(id);
  };

  const resetInput = () => {
    setSelectedIds([]);
    setIsDropdownVisible(false);
  };

  const handleChange =
    props.type === 'checkbox' ? handleCheckboxChange : handleRadioChange;

  const selectedNames = data
    .filter((item) => selectedIds.includes(item.id))
    .map((item) => item.name);

  return (
    <div className={classes['filter-container']}>
      <label htmlFor="display" className={classes['form-label']}>
        {title}
      </label>
      <div className={classes['input-container']}>
        <input
          id="display"
          placeholder={placeholder ? placeholder : ''}
          readOnly
          value={selectedNames.join(', ').slice(0, 20)}
          onFocus={() => setIsDropdownVisible(true)}
          onBlur={() => setTimeout(() => setIsDropdownVisible(false), 200)}
        />
        <button
          type="button"
          className={classes['reset-button']}
          onClick={resetInput}
        >
          <i className="fa-solid fa-x" />
        </button>
      </div>

      <input
        id={name}
        name={name}
        value={selectedIds}
        readOnly
        style={{ display: 'none' }}
      />

      {isDropdownVisible && (
        <ul className={classes['dropdown']}>
          {data.map((item) => (
            <li
              key={item.id}
              className={
                selectedIds.includes(item.id) ? classes['selected'] : ''
              }
              onClick={() => handleChange(item.id)}
            >
              {item.name}
              {selectedIds.includes(item.id) && (
                <i className="fa-solid fa-check" />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
