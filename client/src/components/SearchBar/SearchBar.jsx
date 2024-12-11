import classes from './SearchBar.module.css';
import FilterForm from '../FilterForm/FilterForm';
import { useState } from 'react';

export default function SearchBar() {
  const [isFilter, setIsFilter] = useState(true);

  function handleFilterClick() {
    setIsFilter((prev) => {
      return !prev;
    });
  }

  return (
    <div className={classes['container']}>
      <div className={classes['input-container']}>
        <input
          type="text"
          className={classes['search-input']}
          placeholder="Знайти..."
        />
        <button className={classes['search-btn']} onClick={handleFilterClick}>
          <i className="fa-solid fa-filter"></i>
        </button>
        <button className={classes['search-btn']}>
          Пошук
          <i
            className="fa-solid fa-magnifying-glass"
            style={{ paddingRight: 0 }}
          ></i>
        </button>
      </div>
      <FilterForm isHidden={isFilter} />
    </div>
  );
}
