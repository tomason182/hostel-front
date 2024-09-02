import Header from "../landing_page/Header";
import LoginHeading from "./LoginHeading";
import LoginForm from "../forms/LoginForm";
import styles from "../../styles/RegistrationPage.module.css";

export default function LoginPage() {
  return (
    <>
      <Header />
      <div className={styles.mainContainer}>
        <LoginHeading />
        <LoginForm />
      </div>
    </>
  );
}
