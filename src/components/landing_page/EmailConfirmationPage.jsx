import styles from "../../styles/EmailConfirmationPage.module.css";
import { Link } from "react-router-dom";

export default function EmailConfirmationPage() {
  const handleResendEmail = () => {};
  return (
    <div className={styles.mainContent}>
      <h1>Confirm Your Email Address</h1>
      <p>
        We&apos;ve sent an email to your inbox with a confirmation link. Please
        check your email and click the link to complete your account setup. If
        you don&apos;t see it within a few minutes, check your spam or junk
        folder.
      </p>

      <p>
        Still having trouble?&nbsp;
        <Link to="#" className={styles.footerLink}>
          Resend confirmation email
        </Link>
        &nbsp;or&nbsp;
        <Link to="#" className={styles.footerLink}>
          Contact support
        </Link>
      </p>
    </div>
  );
}
