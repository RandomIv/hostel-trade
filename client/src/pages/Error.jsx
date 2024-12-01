import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  let title = "Виникла помилка!";
  let message = "Щось пішло не так... ";

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "Сторінка не знайдена!";
    message = "Не можемо знайти таку сторінку";
  }

  return (
    <>
      <h1>{title}</h1>
      <p>{message}</p>
    </>
  );
}
