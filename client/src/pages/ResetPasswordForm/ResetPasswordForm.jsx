import { Form, useActionData, useNavigate } from 'react-router-dom';
import classes from '../ResetPassword/ResetPassword.module.css';
import { resetPassword } from '../../utils/confirmation';
import FormSubmissionBox from '../../components/FormSubmissionBox/FormSubmissionBox';

export default function ResetPasswordFormPage() {
  const response = useActionData();

  return (
    <div className={classes['container']}>
      <Form method="post" className={classes['pass-form']}>
        <h1>Введіть дані для зміни паролю</h1>
        <p>
          <label htmlFor="email">Пошта</label>
          <input id="email" type="email" name="email" required minLength={6} />
        </p>

        {response?.error && <FormSubmissionBox errors={[response.message]} />}
        {response?.success && (
          <FormSubmissionBox successMessage="Перевірте свою пошту. Ми відправили Вам на пошту лист зі скиданням паролю." />
        )}

        <div className={classes['email-btn-row']}>
          <button type="submit" className={classes['btn-fill']}>
            Змінити пароль
          </button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const data = await request.formData();

  const email = data.get('email');
  const response = await resetPassword(email);

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
