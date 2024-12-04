/* eslint-disable react-refresh/only-export-components */
import classes from './Auth.module.css';
import AuthForm from '../../components/AuthForm/AuthForm';
import { redirect } from 'react-router-dom';

export default function AuthPage() {
  return (
    <div className={classes.background}>
      <AuthForm />
    </div>
  );
}

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'login';

  if (mode !== 'login' && mode !== 'signup') {
    throw new Error(
      JSON.stringify({ message: 'Unsupported mode.' }, { status: 422 })
    );
  }

  const data = await request.formData();

  let authData = {
    password: data.get('password'),
  };

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

  console.log(authData);

  const response = await fetch('http://localhost:5000/api/' + mode, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }
  const resData = await response.json();
  console.log(resData);
  if (response.ok) {
    if (resData.token) {
      localStorage.setItem('token', resData.token);
      return redirect('/profile');
    } else {
      return redirect('/auth?mode=login');
    }
  } else {
    throw new Error(
      JSON.stringify(
        { message: 'Could not authenticate user' },
        { status: 401 }
      )
    );
  }
}
