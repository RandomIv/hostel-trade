import { useLoaderData } from 'react-router-dom';
import ProfileNavBar from '../../components/ProfileNavBar/ProfileNavBar';
import SearchProducts from '../../components/SearchProducts/SearchProducts';

export default function UserProductsPage() {
  const { productsData, hostelsData, typesData, favoritesData } =
    useLoaderData();

  const userId = localStorage.getItem('userId');

  return (
    <>
      <ProfileNavBar />
      <SearchProducts
        productsData={productsData}
        hostelsData={hostelsData}
        typesData={typesData}
        favoritesData={favoritesData}
        userId={userId}
      />
    </>
  );
}
