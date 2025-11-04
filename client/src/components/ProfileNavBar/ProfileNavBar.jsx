import { NavLink, useLocation } from 'react-router-dom';

import classes from './ProfileNavBar.module.css';

export default function ProfileNavBar() {
  const url = useLocation().pathname;
  const userId = localStorage.getItem('userId');

  return (
    <div className={classes['row']}>
      <NavLink
        to="/profile/"
        end
        className={({ isActive }) => (isActive ? classes['active-link'] : '')}
      >
        Профіль
      </NavLink>
      <NavLink
        to={`/profile/user-products?userId=${userId}`}
        className={({ isActive }) => (isActive ? classes['active-link'] : '')}
      >
        Мої оголошення
      </NavLink>
      <NavLink
        to={`/profile/liked-products?userId=${userId}`}
        className={({ isActive }) => (isActive ? classes['active-link'] : '')}
      >
        Обране
      </NavLink>

      {url === '/profile/user-products' && (
        <NavLink
          to="/profile/new-product"
          className={`${classes['active-link']} ${classes['add-product-link']}`}
        >
          Додати оголошення
        </NavLink>
      )}
    </div>
  );
}
