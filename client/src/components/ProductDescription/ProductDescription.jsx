import classes from './ProductDescription.module.css';
import { convertDate } from '../../utils/dataConvert';

export default function ProductDescription({ data }) {
  const {
    id,
    user_id,
    type_id: type,
    description,
    created_at,
    updated_at,
    views_count,
  } = data;

  return (
    <>
      <div className={classes['container']}>
        <h2>Опис</h2>
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
    </>
  );
}
