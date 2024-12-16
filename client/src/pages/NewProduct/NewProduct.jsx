import classes from './NewProduct.module.css';

export default function NewProductPage() {
  return (
    <div className={classes.container}>
      <h1>Нове оголошення</h1>
      <div className={classes['box']}>
        <h2>Головна інформація</h2>
        <div className={classes['row']}>
          <div>
            <label htmlFor=""></label>
          </div>
        </div>
        <div className={classes['row']}></div>
      </div>
    </div>
  );
}
