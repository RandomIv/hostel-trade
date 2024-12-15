import { Link } from 'react-router-dom';
import classes from './Home.module.css';
export default function HomePage() {
  return (
    <div className={classes.container}>
      <div className={classes['top-container']}>
        <div className={classes['top-img-container']}>
          <img src="/home/dorms-images.png" alt="dorms-img-1" />
        </div>
        <div className={classes['top-text-container']}>
          <div>
            <h2>Ваш улюблений Hostel Trade тепер має свій сайт!</h2>
            <Link to="/auth?mode=signup" className={classes.btn}>
              Створити акаунт
              <i
                className="fa-solid fa-arrow-right"
                style={{ paddingLeft: '10px' }}
              />
            </Link>
          </div>
        </div>
      </div>

      <div className={classes['bottom-container']}>
        <h2>У дружній спільності КПІ-шників знайдеться все і навіть більше!</h2>
        <Link to="/search" className={classes.btn}>
          Знайти саме те!
        </Link>
      </div>
    </div>
  );
}
