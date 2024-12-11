import { Outlet } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation/MainNavigation';

export default function RootLayout() {
  return (
    <>
      <div className="background">
        <MainNavigation />
        <Outlet />
      </div>
    </>
  );
}
