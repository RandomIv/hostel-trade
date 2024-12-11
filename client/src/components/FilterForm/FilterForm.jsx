import { Form, Link } from 'react-router-dom';
import classes from './FilterForm.module.css';

export default function FilterForm({ isHidden }) {
  return (
    <Form method="post" className={classes['filter-form']} hidden={isHidden}>
      <h2>Фільтри</h2>
      <div className={classes['row']}>
        <div className={classes['col']}>
          <div className={classes['filter-container']}>
            <label htmlFor="category" className={classes['form-label']}>
              Категорія
            </label>
            <input
              id="category"
              type="text"
              name="category"
              placeholder="Будь-яка"
            />
          </div>

          <div className={classes['price-container']}>
            <label htmlFor="min-price" className={classes['form-label']}>
              Ціна
            </label>
            <div className={classes['price']}>
              <input
                id="min-price"
                type="number"
                name="min"
                placeholder="Від"
              />
              <input id="max-price" type="number" name="max" placeholder="До" />
            </div>
          </div>
          <div className={classes['price-container']}>
            <label htmlFor="hostel" className={classes['form-label']}>
              Гуртожиток
            </label>
            <div className={classes['price']}>
              <input
                id="hostel"
                type="number"
                name="hostel"
                placeholder="Номер"
              />
            </div>
          </div>
        </div>
        <div className={classes['col']}>
          <div>
            <label htmlFor="name-sort" className={classes['form-label']}>
              За назвою:
            </label>
            <input id="name-sort" name="name-sort" />
          </div>

          <div>
            <label htmlFor="price-sort" className={classes['form-label']}>
              За ціною:
            </label>
            <input id="price-sort" name="price-sort" />
          </div>
        </div>
      </div>

      <p>
        <Link to={`/search`} className={classes.link}>
          Застосувати
        </Link>
      </p>
    </Form>
  );
}
