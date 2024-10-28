import styles from "../../styles/ForgotPassword.module.css";
import formStyles from "../../styles/formDefaultStyle.module.css";
export default function ForgotPassword() {
  return (
    <div className={styles.mainContent}>
      <h1>Forgot Your Password?</h1>
      <p>
        Don&apos;t worry, we&apos;ve got you covered! Enter your registered
        email address below, and we&apos;ll send you a link to reset your
        password. Just follow the instructions in the email to regain access to
        your account.
      </p>
      <form className={formStyles.mainForm}>
        <label>
          Enter email address
          <input
            type="email"
            name="email"
            required
            aria-required
            placeholder="example@email.com"
          />
        </label>
        <menu className={formStyles.buttonContainer}>
          <button className={formStyles.submitBtn} type="submit">
            Send
          </button>
        </menu>
      </form>
    </div>
  );
}
