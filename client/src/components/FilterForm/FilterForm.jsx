import classes from './FilterForm.module.css';

import DropdownInput from './DropdownInput';

import { hostelList } from '../../utils/data';
import { categoryList } from '../../utils/data';

export default function FilterForm({ isHidden }) {
  return (
    <div className={classes['filter-form']} hidden={isHidden}>
      <h2>Фільтри</h2>
      <div className={classes['row']}>
        <div className={classes['col']}>
          <div className={classes['filter-container']}>
            <DropdownInput
              title="Категорія"
              name="typeId"
              data={categoryList}
              type="checkbox"
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
            <DropdownInput
              title="Гуртожиток"
              name="hostel"
              data={hostelList}
              placeholder="Номер"
              type="checkbox"
            />
          </div>
        </div>
        <div className={classes['col']}>
          <DropdownInput
            title="За ціною:"
            name="price-sort"
            data={[
              { id: 'asc', name: 'Спочатку дешевші' },
              { id: 'desc', name: 'Спочатку дорожчі' },
            ]}
            type="radio"
          />

          <DropdownInput
            title="За датою:"
            name="date-sort"
            data={[
              { id: 'asc', name: 'Спочатку старіші' },
              { id: 'desc', name: 'Спочатку новіші' },
            ]}
            type="radio"
          />
        </div>
      </div>
    </div>
  );
}
