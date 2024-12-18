import { useLoaderData } from 'react-router-dom';

import ProductForm from '../../components/ProductForm/ProductForm';

import {
  getProductById,
  getHostels,
  getTypes,
} from '../../utils/product/productRequests';

export default function EditProductPage() {
  const { prodData, hostelsData, typesData } = useLoaderData();

  return (
    <ProductForm
      prodData={prodData}
      hostelsData={hostelsData}
      typesData={typesData}
      method={'patch'}
    />
  );
}

export async function loader({ params }) {
  const id = params.productId;
  const prodData = await getProductById(id);
  const hostelsData = await getHostels();
  const typesData = await getTypes();
  return { prodData, hostelsData, typesData };
}
