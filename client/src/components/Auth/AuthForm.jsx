import {
  Form,
  Link,
  useNavigate,
  useNavigation,
  useSearchParams,
} from 'react-router-dom';

import classes from './AuthForm.module.css';

import FormSubmissionBox from '../FormSubmissionBox/FormSubmissionBox';

export default function AuthForm({ error }) {
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();

  const isLogin = searchParams.get('mode') === 'login';
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Form method="post" className={classes['auth-form']}>
      <h1>
        {isLogin
          ? 'Увійдіть до свого акаунту'
          : 'Долучайся до нашої спільноти!'}
      </h1>
      {!isLogin && (
        <>
          <p>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              required
              minLength={6}
            />
          </p>
          <p>
            <label htmlFor="email">Електронна пошта</label>
            <input id="email" type="email" name="email" required />
          </p>
        </>
      )}
      {isLogin && (
        <p>
          <label htmlFor="username-email">Username або пошта</label>
          <input
            id="username-email"
            type="text"
            name="username-email"
            required
          />
        </p>
      )}

      <p>
        <label htmlFor="password">Пароль</label>
        <input
          id="password"
          type="password"
          name="password"
          required
          minLength={6}
        />
      </p>

      {!isLogin && (
        <p>
          <label htmlFor="confirm-password">Повторіть пароль</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
            required
            minLength={6}
          />
        </p>
      )}

      <p className={classes.link}>
        <span>Забули пароль?</span>
        <Link to={'/reset-password-form'}>Змінити пароль</Link>
      </p>

      {error && (
        <div className={classes['error-container']}>
          <FormSubmissionBox errors={[error.message]} />
        </div>
      )}
      <div className={classes['btn-container']}>
        <button disabled={isSubmitting}>
          {!isLogin ? 'Зареєструватись' : 'Увійти'}
        </button>
      </div>
      <p className={classes.link}>
        <span>{isLogin ? 'Не маєте акаунту?' : 'Вже маєте акаунт?'}</span>
        <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>
          {isLogin ? 'Зареєструватись' : 'Увійти'}
        </Link>
      </p>
    </Form>
  );
}
