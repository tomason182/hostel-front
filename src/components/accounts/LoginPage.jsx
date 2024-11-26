import LoginHeading from "./LoginHeading";
import LoginForm from "../forms/LoginForm";
import GoogleSignIn from "./GoogleSignIn";
import DividerLine from "./DividerLine";
import styles from "../../styles/LoginPage.module.css";

export default function LoginPage() {
  return (
    <div className={styles.mainContent}>
      <LoginHeading />
      <div className={styles.loginContainer}>
        <div className={styles.oauth}>
          <GoogleSignIn />
        </div>
        <DividerLine />
        <LoginForm />
      </div>
    </div>
  );
}
