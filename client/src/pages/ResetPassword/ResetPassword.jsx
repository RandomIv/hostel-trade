import { Form, useActionData, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import classes from './ResetPassword.module.css';

import { saveNewPassword } from '../../utils/confirmation';
import FormSubmissionBox from '../../components/FormSubmissionBox/FormSubmissionBox';

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const response = useActionData();
  const navigate = useNavigate();

  if (response?.success) {
    setTimeout(() => {
      navigate('/profile');
    }, 1000);
  }

  function handleShowPassword() {
    setShowPassword((prev) => !prev);
  }

  return (
    <div className={classes['container']}>
      <Form method="post" className={classes['pass-form']}>
        <h1>Придумайте новий пароль</h1>
        <p>
          <label htmlFor="password">Новий Пароль</label>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            required
            minLength={6}
          />
        </p>
        <p>
          <label htmlFor="confirm-password">Повторіть новий пароль</label>
          <input
            id="confirm-password"
            type={showPassword ? 'text' : 'password'}
            name="confirm-password"
            required
            minLength={6}
          />
        </p>
        {response?.error && <FormSubmissionBox errors={[response.message]} />}
        {response?.success && (
          <FormSubmissionBox successMessage={'Пароль успішно змінено!'} />
        )}

        <div className={classes['btn-row']}>
          <button
            type="button"
            className={classes['btn-link']}
            onClick={handleShowPassword}
          >
            {showPassword ? 'Сховати пароль' : 'Показати пароль'}
          </button>
          <button type="submit" className={classes['btn-fill']}>
            Змінити пароль
          </button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const url = new URL(request.url);
  const data = await request.formData();

  const token = url.searchParams.get('token');

  const password = data.get('password');
  const confirmPassword = data.get('confirm-password');

  if (password !== confirmPassword) {
    return {
      error: true,
      message: 'Паролі не співпадають.',
      status: 500,
    };
  }

  const response = await saveNewPassword(password, token);
  if (response.ok) {
    return { success: true };
  } else {
    return {
      error: true,
      message: 'Не вдалось змінити пароль.',
      status: 500,
    };
  }
}
