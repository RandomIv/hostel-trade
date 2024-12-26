import { useLoaderData } from 'react-router-dom';
import ProfileNavBar from '../../components/ProfileNavBar/ProfileNavBar';
import {
  getFavoriteProducts,
  getHostels,
  getTypes,
} from '../../utils/product/productRequests';
import SearchProducts from '../../components/SearchProducts/SearchProducts';
import { ensureAccessToken } from '../../utils/auth.js';

export default function LikedProductsPage() {
  const { favoritesData, hostelsData, typesData } = useLoaderData();

  const userId = localStorage.getItem('userId');

  return (
    <>
      <ProfileNavBar />
      <SearchProducts
        productsData={favoritesData}
        hostelsData={hostelsData}
        typesData={typesData}
        favoritesData={favoritesData}
        userId={userId}
      />
    </>
  );
}

export async function loader({ request }) {
  await ensureAccessToken();
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const favoritesData = await getFavoriteProducts(searchParams);
  const hostelsData = await getHostels();
  const typesData = await getTypes();
  return { favoritesData, hostelsData, typesData };
}
