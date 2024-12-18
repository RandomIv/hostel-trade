import { useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';

import classes from './ProductForm.module.css';

import MainInfo from '../../components/NewProduct/MainInfo';
import PhotoBox from '../../components/NewProduct/PhotoBox';
import NewProductDescription from '../../components/NewProduct/NewProductDescription';
import FormSubmissionBox from '../../components/FormSubmissionBox/FormSubmissionBox';

import { handleNewProduct } from '../../utils/product/productFormData';

export default function ProductForm({
  prodData,
  hostelsData,
  typesData,
  method,
}) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  async function handleSubmit(event) {
    event.preventDefault();
    let response;

    if (method === 'post') {
      response = await handleNewProduct(event.target, token);
    }
    if (method === 'patch') {
      response = await handleNewProduct(event.target, token);
    }

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
      <MainInfo
        prodData={prodData && prodData}
        hostelsData={hostelsData}
        typesData={typesData}
      />
      <PhotoBox prodData={prodData && prodData} />
      <NewProductDescription prodData={prodData && prodData} />
      {errors.length > 0 && <FormSubmissionBox errors={errors} />}
      {isSubmitted && (
        <FormSubmissionBox
          isSubmitted={isSubmitted}
          title={
            method === 'post'
              ? 'Оголошення успішно додано'
              : 'Оголошення успішно змінено'
          }
        />
      )}
      <p>
        <button className={classes['publish-btn']}>
          {method === 'post' ? 'Опублікувати' : 'Зберегти зміни'}
        </button>
      </p>
    </Form>
  );
}
