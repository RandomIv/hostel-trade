import classes from './ProductUserDetails.module.css';
import emptyAvatarPhoto from '../../assets/no-avatar-image.png';

import { convertDate } from '../../utils/dataConvert';

export default function ProductUserDetails({ data }) {
  const { id, avatar_img, email, username, created_at, phone_number } = data;

  return (
    <div className={classes['container']}>
      <h2>{"Зв'язатися з КПІ-шником"}</h2>
      <div className={classes.row}>
        <div>
          <div className={classes['img-row']}>
            <div>
              <img
                src={avatar_img ? avatar_img : emptyAvatarPhoto}
                alt="avatar-image"
                className={classes['avatar-img']}
              />
            </div>
            <div className={classes['centered-col']}>
              <div>
                <h4>{username}</h4>
                <p>З нами з: {convertDate(created_at)}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={classes['centered-col']}>
          <div>
            <p>
              Пошта:{' '}
              <span className={classes.info}>{email ? email : 'немає'}</span>
            </p>
            <p>
              Телефон:{' '}
              <span className={classes.info}>
                {phone_number ? phone_number : 'немає'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
