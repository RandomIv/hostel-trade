import { Form } from 'react-router-dom';
import classes from './NewProduct.module.css';

import MainInfo from '../../components/NewProduct/MainInfo';
import PhotoBox from '../../components/NewProduct/PhotoBox';
import NewProductDescription from '../../components/NewProduct/NewProductDescription';

export default function NewProductPage() {
  return (
    <Form className={classes.container}>
      <h1>Нове оголошення</h1>
      <MainInfo />
      <PhotoBox />
      <NewProductDescription />
      <p>
        <button className={classes['publish-btn']}>Опублікувати</button>
      </p>
    </Form>
  );
}
