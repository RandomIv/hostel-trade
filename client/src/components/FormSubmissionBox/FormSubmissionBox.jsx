import classes from './FormSubmissionBox.module.css';

export default function FormSubmissionBox({ errors, isSubmitted, title }) {
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
      {isSubmitted && (
        <div className={classes['submitted-box']}>
          {title ? title : 'Успішно.'}
        </div>
      )}
    </>
  );
}
