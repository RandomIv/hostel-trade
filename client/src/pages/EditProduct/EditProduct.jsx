import { useLoaderData } from 'react-router-dom';
import { getProductById } from '../../utils/product';

export default function EditProductPage() {
  const prodData = useLoaderData();
  return (
    <>
      <h1>Edit Product Page </h1>
    </>
  );
}

export async function loader({ params }) {
  const id = params.productId;
  const prodData = await getProductById(id);
  return prodData;
}
