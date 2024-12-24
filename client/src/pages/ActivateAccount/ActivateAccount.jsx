import { redirect, useLoaderData, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import classes from './ActivateAccount.module.css';
import confirmationArrow from '../../assets/confirmation-ico.png';
import errorCross from '../../assets/error-cross.png';

import { confirmEmail } from '../../utils/confirmation';

export default function ActivateAccount() {
  const token = useLoaderData();
  const { data, isPending, isError } = useQuery({
    queryKey: ['activate-account', { token }],
    queryFn: ({ signal }) => confirmEmail({ signal, token }),
  });

  return (
    <div className={classes['container']}>
      <div>
        {data && (
          <>
            <img src={confirmationArrow} alt="confirmation-arrow-image" />
            <h1>Акаунт успішно підтверджено! </h1>
            <p>Можете закрити це вікно</p>
          </>
        )}
        {isPending && <h1>Підтверджуємо акаунт... </h1>}
        {isError && (
          <>
            <img src={errorCross} alt="error-cross-image" />
            <h1>Виникла помилка! </h1>
            <p>
              Під час активації акаунта відбулась помилка. Спробуйте пізніше...
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export async function loader({ request }) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const token = searchParams.get('token');

  return token;
}
