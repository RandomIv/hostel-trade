import { Form, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import classes from './NewProduct.module.css';

import MainInfo from '../../components/NewProduct/MainInfo';
import PhotoBox from '../../components/NewProduct/PhotoBox';
import NewProductDescription from '../../components/NewProduct/NewProductDescription';
import FormSubmissionBox from '../../components/FormSubmissionBox/FormSubmissionBox';

import { postNewProduct } from '../../utils/product';

export default function NewProductPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const typeId = formData.get('typeId');
    const hostelId = formData.get('hostelId');
    formData.delete('photo');

    const newErrors = [];

    if (!typeId) newErrors.push('Виберіть будь ласка категорію.');
    if (!hostelId) newErrors.push('Виберіть будь ласка гуртожиток.');

    setErrors(newErrors);

    if (newErrors.length > 0) return;

    setErrors([]);

    const formObject = Object.fromEntries(formData.entries());

    const response = await postNewProduct({
      body: JSON.stringify(formObject),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 'success') {
      setIsSubmitted(true);
      setTimeout(() => {
        navigate(`/profile/user-products?userId=${userId}`);
      }, 1000);
    }
  };

  return (
    <Form method="post" onSubmit={handleSubmit} className={classes.container}>
      <h1>Нове оголошення</h1>
      <MainInfo />
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
