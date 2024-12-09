import { redirect } from 'react-router-dom';
import { logout } from '../../utils/auth';

export async function action() {
  localStorage.removeItem('token');

  try {
    localStorage.removeItem('token');
    const res = await logout();
    console.log('Logout response:', res);
    return redirect('/');
  } catch (error) {
    console.error('Logout failed:', error);
    return redirect('/');
  }
}
