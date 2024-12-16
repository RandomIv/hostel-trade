import { useLoaderData, useRouteLoaderData } from 'react-router-dom';
import { getUserByToken } from '../../utils/profile';

export default function ProfilePage() {
  const userData = useRouteLoaderData('profile-root');

  return (
    <>
      <h1>Profile Page</h1>
      <p>Id: {userData.user.id}</p>
    </>
  );
}

export async function loader() {
  const userData = await getUserByToken();
  return userData;
}
