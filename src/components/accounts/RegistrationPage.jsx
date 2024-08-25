import Header from "../landing_page/Header";
import RegistrationHeading from "./RegistrationHeading";
import SignUpForm from "../forms/SignUpForm";
import styles from "../../styles/RegistrationPage.module.css";

function RegistrationPage() {
  return (
    <>
      <Header />
      <div className={styles.mainContainer}>
        <RegistrationHeading />
        <SignUpForm />
      </div>
    </>
  );
}

export default RegistrationPage;
