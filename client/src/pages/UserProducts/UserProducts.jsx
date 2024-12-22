import { useLoaderData } from 'react-router-dom';
import ProfileNavBar from '../../components/ProfileNavBar/ProfileNavBar';
import SearchProducts from '../../components/SearchProducts/SearchProducts';
import SearchPage from '../SearchPage/SearchPage';

export default function UserProductsPage() {
  const { productsData, hostelsData, typesData } = useLoaderData();

  const userId = localStorage.getItem('userId');

  return (
    <>
      <ProfileNavBar />
      <SearchProducts
        productsData={productsData}
        hostelsData={hostelsData}
        typesData={typesData}
        userId={userId}
      />
    </>
  );
}
