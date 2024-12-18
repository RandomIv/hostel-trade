import { useLoaderData } from 'react-router-dom';

import { getHostels, getTypes } from '../../utils/product/productRequests';
import ProductForm from '../../components/ProductForm/ProductForm';

export default function NewProductPage() {
  const { hostelsData, typesData } = useLoaderData();

  return (
    <ProductForm
      hostelsData={hostelsData}
      typesData={typesData}
      method={'post'}
    />
  );
}

export async function loader() {
  const hostelsData = await getHostels();
  const typesData = await getTypes();
  return { hostelsData, typesData };
}
