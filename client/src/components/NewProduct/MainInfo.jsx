import { useRef } from 'react';

import DropdownInput from '../DropdownInput/DropDownInput';
import classes from './NewProduct.module.css';

export default function MainInfo({
  prodData,
  hostelsData,
  typesData,
  defaultValue,
}) {
  const nameRef = useRef(null);
  const priceRef = useRef(null);

  const { name, price, type, hostel } = prodData || {};
  const typeId = type?.id;
  const hostelId = hostel?.id;

  const sortedHostels = hostelsData.sort((a, b) => a.number - b.number);

  function resetInput(name) {
    if (name === 'name' && nameRef.current) nameRef.current.value = '';
    if (name === 'price' && priceRef.current) priceRef.current.value = '';
  }

  return (
    <div className={classes['box']}>
      <h2>Головна інформація</h2>
      <div>
        <label htmlFor="name" className={classes['form-label']}>
          Назва
        </label>
        <div className={classes['input-box']}>
          <input
            id="name"
            type="text"
            name="name"
            ref={nameRef}
            className={`${classes['form-input']} ${classes['title-input']}`}
            placeholder="Коротко опишіть товар..."
            defaultValue={name && name}
            required
            minLength={3}
          />
          <button
            type="button"
            className={classes['name-reset-button']}
            onClick={() => resetInput('name')}
          >
            <i className="fa-solid fa-x" />
          </button>
        </div>
      </div>
      <div className={classes['row']}>
        <div>
          <label htmlFor="name" className={classes['form-label']}>
            Ціна
          </label>
          <div className={classes['price-input-box']}>
            <input
              id="price"
              type="number"
              name="price"
              ref={priceRef}
              className={classes['form-input']}
              defaultValue={price && price}
              required
            />
            <button
              type="button"
              className={classes['price-reset-button']}
              onClick={() => resetInput('price')}
            >
              <i className="fa-solid fa-x" />
            </button>
          </div>
        </div>

        <div className={classes['dropdown-input']}>
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

        <div className={classes['dropdown-input']}>
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
