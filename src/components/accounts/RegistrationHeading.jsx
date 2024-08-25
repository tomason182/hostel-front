import { Link } from "react-router-dom";
import styles from "../../styles/RegistrationHeading.module.css";

function RegistrationHeading() {
  return (
    <div className={styles.mainContainer}>
      <h2>Create an account for free</h2>
      <p>
        Do you have an account?&nbsp;<Link to="#">Sign in</Link>
      </p>
    </div>
  );
}

export default RegistrationHeading;
