import classes from './FormSubmissionBox.module.css';

export default function FormSubmissionBox({ errors, successMessage, loading }) {
  return (
    <>
      {errors && errors.length > 0 && (
        <div className={classes['error-box']}>
          <ul>
            {errors.map((error) => {
              return <li key={error}>{error}</li>;
            })}
          </ul>
        </div>
      )}
      {successMessage && (
        <div className={classes['submitted-box']}>
          {successMessage ? successMessage : 'Успішно.'}
        </div>
      )}
      {loading && (
        <div className={classes['loading-box']}>
          <p>Опрацьовуємо запит...</p>
        </div>
      )}
    </>
  );
}
