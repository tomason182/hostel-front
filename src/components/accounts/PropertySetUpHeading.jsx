import styles from "../../styles/RegistrationHeading.module.css";

export default function PropertySetUpHeading() {
  return (
    <div className={styles.mainContainer}>
      <h2>Complete Your Registration</h2>
      <p>
        To create your account, please provide your property name and agree to
        our terms and conditions.
        <strong> Your data will not be saved if you leave this page.</strong>
      </p>
    </div>
  );
}
