import RegistrationHeading from "./RegistrationHeading";
import PropertySetUpHeading from "./PropertySetUpHeading";
import SignUpForm from "../forms/SignUpForm";
import PropertyRegistrationForm from "../forms/PropertyRegistrationForm";
import GoogleSignIn from "./GoogleSignIn";
import DividerLine from "./DividerLine";
import styles from "../../styles/LoginPage.module.css";
import { useState } from "react";

function RegistrationPage() {
  const [token, setToken] = useState(null);
  return token ? (
    <>
      <PropertySetUpHeading />
      <PropertyRegistrationForm token={token} />
    </>
  ) : (
    <div className={styles.mainContent}>
      <RegistrationHeading />
      <div className={styles.loginContainer}>
        <div className={styles.oauth}>
          <GoogleSignIn setToken={setToken} />
        </div>
        <DividerLine />
      </div>
      <SignUpForm />
    </div>
  );
}

export default RegistrationPage;
