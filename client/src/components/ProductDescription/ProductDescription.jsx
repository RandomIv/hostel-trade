import classes from './ProductDescription.module.css';
import { convertDate } from '../../utils/dataConvert';

export default function ProductDescription({ data }) {
  const { id, description, created_at, updated_at, views_count } = data;
  const category = data.type.name;

  return (
    <div className={classes['container']}>
      <div className={classes['h-row']}>
        <h2>Опис</h2>
        <div>
          <span className={classes.category}>{category}</span>
        </div>
      </div>

      {description && <p>{description}</p>}

      <div className={classes['created-updated-row']}>
        {created_at && <span>Додано: {convertDate(created_at)}</span>}
        {updated_at && <span>Оновлено: {convertDate(updated_at)}</span>}
      </div>

      <div className={classes['additional-info']}>
        <span>Id: {id}</span>
        <span>Перегляди: {views_count}</span>
      </div>
    </div>
  );
}
