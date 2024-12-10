/* eslint-disable react-refresh/only-export-components */
import classes from './Auth.module.css';
import AuthForm from '../../components/Auth/AuthForm';
import { redirect, useActionData } from 'react-router-dom';

export default function AuthPage() {
  const errorData = useActionData();

  return (
    <div className={classes.background}>
      <AuthForm error={errorData} />
    </div>
  );
}

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'login';

  if (mode !== 'login' && mode !== 'signup') {
    return {
      error: true,
      message: 'Unsupported mode.',
      status: 422,
    };
  }

  const data = await request.formData();

  let authData = { password: data.get('password') };

  if (mode === 'signup') {
    authData = {
      username: data.get('username'),
      email: data.get('email'),
      ...authData,
    };
  }
  if (mode === 'login') {
    authData = { loginIdentifier: data.get('username-email'), ...authData };
  }

  try {
    const response = await fetch('http://localhost:5000/api/' + mode, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(authData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        error: true,
        message: errorData.message || 'Could not authenticate user.',
        status: response.status,
      };
    }

    const { data: resData } = await response.json();
    if (resData.token) {
      localStorage.setItem('token', resData.token);
      return redirect('/profile');
    } else {
      return redirect('/auth?mode=login');
    }
  } catch (error) {
    return {
      error: true,
      message: error.message || 'An unexpected error occurred.',
      status: 500,
    };
  }
}
