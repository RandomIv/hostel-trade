import {Form, Link, useRouteLoaderData} from 'react-router-dom';
import classes from './MainNavigation.module.css';

export default function MainNavigation() {
    const token = useRouteLoaderData('root');

    const handleLogout = (event) => {
        const confirmed = window.confirm('Ви впевнені, що хочете вийти?');
        if (!confirmed) {
            event.preventDefault();
        }
    };

    return (
        <>
            <div className={classes['navbar-container']}>
                <Link to="/" className={classes['navbar-img-link-container']}>
                    <div className={classes['navbar-img-container']}>
                        <img
                            src="/hostel-image.png"
                            alt="hostel-image"
                            className={classes['navbar-img']}
                        />
                    </div>
                    <span className={classes['navbar-img-link-text']}>Hostel Trade</span>
                </Link>
                <div className={classes['auth-reg-container']}>
                    {token ? (
                        <div className={classes['logout-btn-container']}>
                            <Form action="/logout" method="post" onSubmit={handleLogout}>
                                <button className={classes['auth-logout-btn']}>Вийти</button>
                            </Form>
                            <Link to="/profile" className={classes['auth-auth-btn']}>
                                Профіль
                            </Link>
                        </div>
                    ) : (
                        <>
                            <Link to="/auth?mode=signup" className={classes['auth-auth-btn']}>
                                Зареєструватись
                            </Link>
                            <Link to="/auth?mode=login" className={classes['auth-auth-btn']}>
                                Увійти
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}