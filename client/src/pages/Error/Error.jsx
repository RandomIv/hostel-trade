import { useRouteError } from 'react-router-dom';

import classes from './Error.module.css';
import sadEmoticonPhoto from '../../assets/sad-emoticon-face.png';

export default function ErrorPage() {
  const error = useRouteError();

  let title = 'Виникла помилка!';
  let message = 'Щось пішло не так... ';

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = 'Сторінка не знайдена!';
    message = 'Не можемо знайти таку сторінку';
  }

  if (error.status === 401) {
    title = 'Авторизація не вдалась!';
    message = 'Ми не змогли автентифікувати користувача';
  }

  return (
    <div className={classes['container']}>
      <div className={classes['error-container']}>
        <img src={sadEmoticonPhoto} alt="sad-emoticon-face" />
        <div className={classes['error-info']}>
          <div>
            <h1>{title}</h1>
            <p>{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
