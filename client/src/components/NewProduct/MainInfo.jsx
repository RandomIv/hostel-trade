import { useState } from 'react';

import DropdownInput from '../DropdownInput/DropdownInput';
import classes from './NewProduct.module.css';

export default function MainInfo({ prodData, hostelsData, typesData }) {
  const [defaultValue] = useState([]);

  const { name, price, type, hostel } = prodData || {};
  const typeId = type?.id;
  const hostelId = hostel?.id;

  const sortedHostels = hostelsData.sort((a, b) => a.number - b.number);

  return (
    <div className={classes['box']}>
      <h2>Головна інформація</h2>
      <div>
        <label htmlFor="name" className={classes['form-label']}>
          Назва
        </label>
        <input
          id="name"
          type="text"
          name="name"
          className={`${classes['form-input']} ${classes['title-input']}`}
          placeholder="Коротко опишіть товар..."
          defaultValue={name && name}
          required
          minLength={3}
        />
      </div>
      <div className={classes['row']}>
        <div>
          <label htmlFor="name" className={classes['form-label']}>
            Ціна
          </label>
          <input
            id="price"
            type="number"
            name="price"
            className={classes['form-input']}
            defaultValue={price && price}
            required
          />
        </div>

        <div className="dropdown-input">
          <DropdownInput
            title="Категорія"
            name="typeId"
            data={typesData}
            type="radio"
            placeholder="Будь-яка"
            defaultValue={typeId ? [typeId] : defaultValue}
            className="input-dropdown"
          />
        </div>

        <div className="dropdown-input">
          <DropdownInput
            title="Гуртожиток"
            name="hostelId"
            data={sortedHostels}
            type="radio"
            placeholder="Номер"
            defaultValue={hostelId ? [hostelId] : defaultValue}
            className="input-dropdown"
          />
        </div>
      </div>
    </div>
  );
}
