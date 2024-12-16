import { useLoaderData, useRouteLoaderData } from 'react-router-dom';
import { getUserByToken } from '../../utils/profile';

import ProfileNavBar from '../../components/ProfileNavBar/ProfileNavBar';

export default function ProfilePage() {
  const userData = useRouteLoaderData('profile-root');

  return (
    <>
      <ProfileNavBar />

      <div style={{ width: '80%', margin: 'auto' }}>
        <h1>Profile Page</h1>
        <p>Id: {userData.user.id}</p>
      </div>
    </>
  );
}

export async function loader() {
  const userData = await getUserByToken();
  return userData;
}
