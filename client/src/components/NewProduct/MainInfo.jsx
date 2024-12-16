import { useQuery } from '@tanstack/react-query';

import DropdownInput from '../DropdownInput/DropdownInput';
import classes from './NewProduct.module.css';

import { getHostels, getTypes } from '../../utils/product';
import { useState } from 'react';

export default function MainInfo() {
  const [defaultValue] = useState([]);

  const {
    data: typesData,
    isPending: typesIsPending,
    isError: typesIsError,
  } = useQuery({
    queryKey: ['types'],
    queryFn: getTypes,
  });

  const {
    data: hostelsData,
    isPending: hostelsIsPending,
    isError: hostelsIsError,
  } = useQuery({
    queryKey: ['hostels'],
    queryFn: getHostels,
  });

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
          />
        </div>

        {!typesIsPending && !typesIsError && (
          <div className="dropdown-input">
            <DropdownInput
              title="Категорія"
              name="typeId"
              data={typesData}
              type="radio"
              placeholder="Будь-яка"
              defaultValue={defaultValue}
              className="input-dropdown"
            />
          </div>
        )}

        {!hostelsIsPending && !hostelsIsError && (
          <div className="dropdown-input">
            <DropdownInput
              title="Гуртожиток"
              name="hostelId"
              data={hostelsData}
              type="radio"
              placeholder="Номер"
              defaultValue={defaultValue}
              className="input-dropdown"
            />{' '}
          </div>
        )}
      </div>
    </div>
  );
}
