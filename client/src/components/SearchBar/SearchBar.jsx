import classes from './SearchBar.module.css';
import FilterForm from '../FilterForm/FilterForm';
import { useState } from 'react';
import { Form } from 'react-router-dom';

export default function SearchBar({ hostels, types, userId }) {
  const [isFilter, setIsFilter] = useState(true);

  const handleFilterClick = () => {
    setIsFilter((prev) => {
      return !prev;
    });
  };

  return (
    <Form method="post" className={classes['container']}>
      <input
        type="text"
        name="userId"
        readOnly
        value={userId}
        style={{ display: 'none' }}
      />
      <div className={classes['input-container']}>
        <div className={classes['input-bar-container']}>
          <input
            id="name"
            type="text"
            name="name"
            className={classes['search-input']}
            placeholder="Знайти..."
            autoComplete="off"
          />
          <button className={classes['filter-btn']} onClick={handleFilterClick} data-testid="filter-toggle-btn">
            <i className="fa-solid fa-filter" />
          </button>
        </div>

        <button className={classes['search-btn']}>
          Пошук
          <i
            className="fa-solid fa-magnifying-glass"
            style={{ paddingRight: 0 }}
          />
        </button>
      </div>
      <FilterForm isHidden={isFilter} hostels={hostels} types={types} />
    </Form>
  );
}
