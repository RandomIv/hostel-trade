import { redirect } from 'react-router-dom';
import { logout } from '../../utils/auth';

export async function action() {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  const res = await logout();
  return redirect('/');
}
