import classes from './SearchPage.module.css';

export default function SearchPage() {
  return (
    <>
      <div className={classes['input-container']}>
        <input
          type="text"
          className={classes['search-input']}
          placeholder="Знайти..."
        />
        <button className={classes['search-btn']}>
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
      <div className={classes.container}>
        <h1>Search Page</h1>
      </div>
    </>
  );
}
