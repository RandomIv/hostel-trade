import classes from "./Auth.module.css";
import AuthForm from "../../components/AuthForm/AuthForm";

export default function RegistrationPage() {
  return (
    <div className={classes.background}>
      <AuthForm />
    </div>
  );
}
