import { Form, useLoaderData, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import classes from './NewProduct.module.css';

import MainInfo from '../../components/NewProduct/MainInfo';
import PhotoBox from '../../components/NewProduct/PhotoBox';
import NewProductDescription from '../../components/NewProduct/NewProductDescription';
import FormSubmissionBox from '../../components/FormSubmissionBox/FormSubmissionBox';

import {
  postNewProduct,
  getHostels,
  getTypes,
} from '../../utils/product/productRequests';
import { handleNewProduct } from '../../utils/product/productFormData';

export default function NewProductPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  const { hostelsData, typesData } = useLoaderData();

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await handleNewProduct(event.target, token);

    if (response.isSubmitted && !response.errors.length > 0) {
      setErrors([]);
      setIsSubmitted(true);
      setTimeout(() => {
        navigate(`/profile/user-products?userId=${userId}`);
      }, 1000);
    } else {
      setErrors(response.errors);
    }
  }

  return (
    <Form method="post" onSubmit={handleSubmit} className={classes.container}>
      <h1>Нове оголошення</h1>
      <MainInfo hostelsData={hostelsData} typesData={typesData} />
      <PhotoBox />
      <NewProductDescription />
      {errors.length > 0 && <FormSubmissionBox errors={errors} />}
      {isSubmitted && (
        <FormSubmissionBox
          isSubmitted={isSubmitted}
          title="Оголошення успішно додано"
        />
      )}
      <p>
        <button className={classes['publish-btn']}>Опублікувати</button>
      </p>
    </Form>
  );
}

export async function loader() {
  const hostelsData = await getHostels();
  const typesData = await getTypes();
  return { hostelsData, typesData };
}
