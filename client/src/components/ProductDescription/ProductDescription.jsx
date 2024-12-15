import classes from './ProductDescription.module.css';
import { convertDate } from '../../utils/dataConvert';

export default function ProductDescription({ data }) {
  const { id, description, created_at, updated_at, views_count, hostel } = data;
  const category = data.type.name;
  const hostel_num = hostel.number;

  return (
    <>
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

      <div className={classes['container']}>
        <div className={`${classes['h-row']} ${classes['dorm-box']}`}>
          <div>
            <h2>Місцезнаходження:</h2>
          </div>
          <div>
            {hostel_num ? (
              <span>Гуртожиток №{hostel_num}</span>
            ) : (
              <span>Невідомо</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
