import { useLoaderData } from 'react-router-dom';
import ProfileNavBar from '../../components/ProfileNavBar/ProfileNavBar';
import {
  getFavoriteProducts,
  getHostels,
  getTypes,
} from '../../utils/product/productRequests';
import SearchProducts from '../../components/SearchProducts/SearchProducts';

export default function LikedProductsPage() {
  const { favoriteProductsData, hostelsData, typesData } = useLoaderData();

  const userId = localStorage.getItem('userId');

  return (
    <>
      <ProfileNavBar />
      <SearchProducts
        productsData={favoriteProductsData}
        hostelsData={hostelsData}
        typesData={typesData}
        userId={userId}
      />
    </>
  );
}

export async function loader({ request }) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const favoriteProductsData = await getFavoriteProducts(searchParams);
  const hostelsData = await getHostels();
  const typesData = await getTypes();
  return { favoriteProductsData, hostelsData, typesData };
}
