import { Link } from "react-router-dom";
import styles from "../../styles/SignUpForm.module.css";
export default function LoginForm() {
  return (
    <form className={styles.form}>
      <label htmlFor="username">Email address</label>
      <input
        type="email"
        id="username"
        name="username"
        required
        aria-required
        minLength={3}
        maxLength={50}
      />
      <label htmlFor="psw">Password</label>
      <input type="password" id="psw" name="password" required aria-required />
      <Link className={styles.extras} to="#">
        Forgot your password?
      </Link>
      <button className={styles.submitBtn} type="submit">
        Log in
      </button>
    </form>
  );
}
