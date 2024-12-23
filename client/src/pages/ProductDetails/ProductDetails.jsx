import { Link, useLoaderData, useNavigate } from 'react-router-dom';

import classes from './ProductDetails.module.css';

import PhotoContainer from '../../components/PhotoContainer/PhotoContainer';
import ProductDescription from '../../components/ProductDescription/ProductDescription';
import ProductUserDetails from '../../components/ProductUserDetails/ProductUserDetails';
import FormSubmissionBox from '../../components/FormSubmissionBox/FormSubmissionBox';

import {
  getProductById,
  getUserInfo,
  deleteProduct,
} from '../../utils/product/productRequests';
import { useState } from 'react';
import LikeBtn from '../../components/LikeBtn/LikeBtn';

export default function ProductDetailsPage() {
  const { prodData, userData } = useLoaderData();
  const navigate = useNavigate();
  const [isDeleted, setIsDeleted] = useState(false);

  const { id, name, price, image: images } = prodData;
  const currentUserId = localStorage.getItem('userId');

  const handleDelete = async (event) => {
    const confirmed = window.confirm(
      'Ви впевнені, що хочете видалити оголошення?'
    );
    if (confirmed) {
      const response = await deleteProduct(id);

      if (response.status === 'success') {
        setIsDeleted('success');
        setTimeout(() => {
          navigate(`/profile/user-products?userId=${currentUserId}`);
        }, 1000);
      } else {
        setIsDeleted('failed');
      }
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes['name-price-row']}>
        <h1>{name}</h1>
        <div>
          <h3>{price} грн.</h3>
          <LikeBtn />
        </div>
      </div>
      <div className={classes['photo-box']}>
        <PhotoContainer images={images} />
      </div>
      <ProductDescription data={prodData} />
      <ProductUserDetails data={userData} />
      {isDeleted === 'success' && (
        <FormSubmissionBox
          isSubmitted={isDeleted}
          title="Оголошення успішно видалено"
        />
      )}
      {isDeleted === 'failed' && (
        <FormSubmissionBox
          isSubmitted={isDeleted}
          title="Оголошення успішно видалено"
        />
      )}
      {currentUserId === userData.id && (
        <div className={classes['change-row']}>
          <Link
            to={`/profile/edit-product/${id}`}
            className={classes['edit-btn']}
          >
            Редагувати
          </Link>
          <button className={classes['delete-btn']} onClick={handleDelete}>
            Видалити
          </button>
        </div>
      )}
    </div>
  );
}

export async function loader({ params }) {
  const id = params.productId;
  const prodData = await getProductById(id);
  const userData = await getUserInfo(prodData.user.id);
  return { prodData, userData };
}
