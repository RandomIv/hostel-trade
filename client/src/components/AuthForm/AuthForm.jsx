import { Form, useNavigation } from "react-router-dom";

import classes from "./AuthForm.module.css";

export default function AuthForm() {
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  return (
    <Form method="post" className={classes["auth-form"]}>
      <h1>Долучайся до нашої спільноти! </h1>
      <p>
        <label htmlFor="username">Username</label>
        <input id="username" type="text" name="username" required />
      </p>
      <p>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" required />
      </p>
      <p>
        <label htmlFor="password">Пароль</label>
        <input
          id="password"
          type="password"
          name="password"
          required
          minLength={6}
        />
      </p>
      <div className={classes["btn-container"]}>
        <button disabled={false}>
          {isSubmitting ? "Submitting" : "Зареєструватись"}
        </button>
      </div>
    </Form>
  );
}
