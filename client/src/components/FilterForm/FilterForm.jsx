import classes from './FilterForm.module.css';

import DropdownInput from '../DropdownInput/DropDownInput';
import PriceInput from './PriceInput';

import { useState } from 'react';

export default function FilterForm({ isHidden, hostels, types }) {
  const [defaultValue, setDefaultValue] = useState([]);

  const sortedHostels = hostels.sort((a, b) => a.number - b.number);

  const handleDelAllBtnClick = () => {
    setDefaultValue([]);
  };

  return (
    <div className={classes['filter-form']} hidden={isHidden}>
      <h2>Фільтри</h2>
      <div className={classes['row']}>
        <DropdownInput
          title="Категорія"
          name="typeId"
          data={types}
          type="checkbox"
          placeholder="Будь-яка"
          defaultValue={defaultValue}
        />
        <PriceInput defaultValue={defaultValue} />
        <DropdownInput
          title="Гуртожиток"
          name="hostelId"
          data={sortedHostels}
          placeholder="Номер"
          defaultValue={defaultValue}
          type="checkbox"
        />
        <div className={classes['sort-box']}>
          <DropdownInput
            title="Сортувати:"
            name="sort"
            data={[
              { id: 'price-asc', name: 'Спочатку дешевші' },
              { id: 'price-desc', name: 'Спочатку дорожчі' },
              { id: 'date-asc', name: 'Спочатку старіші' },
              { id: 'date-desc', name: 'Спочатку новіші' },
            ]}
            type="radio"
            defaultValue={defaultValue}
          />
        </div>

        <div className={classes['del-all-box']}>
          <button
            className={classes['del-all-btn']}
            onClick={(event) => {
              event.preventDefault(); // Prevent form submission
              handleDelAllBtnClick();
            }}
          >
            Скинути фільтри
          </button>
        </div>
      </div>
    </div>
  );
}
