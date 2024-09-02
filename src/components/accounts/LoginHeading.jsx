import { Link } from "react-router-dom";
import styles from "../../styles/RegistrationHeading.module.css";

export default function LoginHeading() {
  return (
    <div className={styles.mainContainer}>
      <h2>Sign in to your account</h2>
      <p>
        Don&#39;t you have an account?&nbsp;
        <Link to="/accounts/signup">Sign up</Link>
      </p>
    </div>
  );
}
