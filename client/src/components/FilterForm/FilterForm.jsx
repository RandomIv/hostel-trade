import classes from './FilterForm.module.css';

import DropdownInput from './DropdownInput';
import PriceInput from './PriceInput';

import { useState } from 'react';

export default function FilterForm({ isHidden, hostels, types }) {
  const [defaultValue, setDefaultValue] = useState([]);

  const sortedHostels = hostels.sort((a, b) => a.number - b.number);

  console.log(sortedHostels);

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
          name="hostel"
          data={sortedHostels}
          placeholder="Номер"
          defaultValue={defaultValue}
          type="checkbox"
        />
      </div>
      <div className={classes['row']}>
        <DropdownInput
          title="За ціною:"
          name="price-sort"
          data={[
            { id: 'asc', name: 'Спочатку дешевші' },
            { id: 'desc', name: 'Спочатку дорожчі' },
          ]}
          type="radio"
          defaultValue={defaultValue}
        />

        <DropdownInput
          title="За датою:"
          name="date-sort"
          data={[
            { id: 'asc', name: 'Спочатку старіші' },
            { id: 'desc', name: 'Спочатку новіші' },
          ]}
          type="radio"
          defaultValue={defaultValue}
        />

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
  );
}
