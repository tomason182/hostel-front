import LoginHeading from "./LoginHeading";
import LoginForm from "../forms/LoginForm";
import GoogleSignIn from "./GoogleSignIn";
import styles from "../../styles/LoginPage.module.css";

export default function LoginPage() {
  return (
    <div className={styles.mainContent}>
      <LoginHeading />
      <div className={styles.loginContainer}>
        <div className={styles.auth0}>
          <GoogleSignIn />
        </div>
        <div className={styles.dividerContainer}>
          <hr className={styles.line} />
          <span className={styles.text}>or</span>
          <hr className={styles.line} />
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
