import RegistrationHeading from "./RegistrationHeading";
import SignUpForm from "../forms/SignUpForm";
import GoogleSignIn from "./GoogleSignIn";
import DividerLine from "./DividerLine";
import PropertyRegistrationForm from "../forms/PropertyRegistrationForm";
import PropertySetUpHeading from "./PropertySetUpHeading";
import styles from "../../styles/LoginPage.module.css";
import { useState } from "react";

function RegistrationPage() {
  const [userData, setUserData] = useState({ name: "tomas" });

  return Object.keys(userData).length !== 0 ? (
    <div className={styles.mainContent}>
      <PropertySetUpHeading />
      <PropertyRegistrationForm />
    </div>
  ) : (
    <div className={styles.mainContent}>
      <RegistrationHeading />
      <div className={styles.loginContainer}>
        <div className={styles.oauth}>
          <GoogleSignIn setUserData={setUserData} />
        </div>
        <DividerLine />
      </div>
      <SignUpForm />
    </div>
  );
}

export default RegistrationPage;
