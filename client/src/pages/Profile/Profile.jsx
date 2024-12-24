import classes from './Profile.module.css';
import emptyPhoto from './../../assets/no-avatar-image.png';

import { NavLink, useRouteLoaderData } from 'react-router-dom';
import ProfileNavBar from '../../components/ProfileNavBar/ProfileNavBar.jsx';

import { getUserByToken } from '../../utils/profile.js';
import { getHostels } from '../../utils/product/productRequests.js';
import FormSubmissionBox from '../../components/FormSubmissionBox/FormSubmissionBox.jsx';
import { useState } from 'react';
import { resetPassword } from '../../utils/confirmation.js';
export default function ProfilePage() {
  const [message, setMessage] = useState(null);
  const { userData: user } = useRouteLoaderData('profile-root');

  async function handleChangePassword() {
    const response = await resetPassword(user.email);

    if (response.ok) {
      setMessage(
        'Перевірте свою пошту. Ми відправили Вам на пошту лист зі скиданням паролю.'
      );
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  }

  return (
    <>
      <ProfileNavBar />
      <div className={classes['profile-page']}>
        <div className={classes['profile-container']}>
          <div className={classes['profile-main']}>
            <div className={classes['profile-image-container']}>
              <img
                src={user.avatar_img || emptyPhoto}
                alt="Your avatar"
                className={classes['profile-image']}
              />
            </div>
            <ul className={classes['profile-main-description']}>
              <li>
                <h2>{user.username}</h2>
              </li>
              <li>
                <b>Пошта:</b>
                <p>{user.email}</p>
              </li>
              <li>
                <b>Телефон:</b>
                <p>{user.phone_number}</p>
              </li>
            </ul>
            <div className={classes['profile-main-date']}>
              <p>З нами з: {user.created_at.split('T')[0]}</p>
            </div>
          </div>
          <div className={classes['profile-details']}>
            <ul>
              <li>
                <h2>Особиста інформація</h2>
              </li>
              <li>
                <b>Ім'я:</b>
                <p>{user.first_name}</p>
              </li>
              <li>
                <b>Прізвище:</b>
                <p>{user.last_name}</p>
              </li>
              <li>
                <b>Гуртожиток:</b>
                <p>{user.hostel}</p>
              </li>
            </ul>
          </div>
        </div>
        {message && <FormSubmissionBox title={message} />}
        <div className={classes['profile-manipulation']}>
          <NavLink
            to="/profile/profile-settings"
            className={({ isActive }) =>
              isActive ? classes['active-link'] : ''
            }
          >
            Редагувати профіль
          </NavLink>
          <button onClick={handleChangePassword}>Змінити пароль</button>
        </div>
      </div>
    </>
  );
}

export async function loader() {
  const data = await getUserByToken();
  const userData = { ...data, hostel: data.hostel?.number || null };
  const hostels = await getHostels();
  const sortedHostels = hostels.sort((a, b) => a - b);
  return { userData, sortedHostels };
}
