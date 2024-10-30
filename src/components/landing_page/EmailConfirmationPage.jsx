import { useState } from "react";
import styles from "../../styles/EmailConfirmationPage.module.css";
import { Link, useParams } from "react-router-dom";

export default function EmailConfirmationPage() {
  const [message, setMessage] = useState(null);
  const { email } = useParams();

  const handleResendEmail = async () => {
    try {
      const url =
        import.meta.env.VITE_URL_BASE + "users/resend-email-verification";
      const options = {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      };
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        setMessage("Successfully resent email");
      } else {
        console.log(data);
        setMessage("Unable to resend email. Please, try again later");
      }
    } catch (err) {
      console.error("Error resending verification email: ", err);
      setMessage("Network error occurred. Unable to resend email");
    }
  };
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
        <Link to="#" className={styles.footerLink} onClick={handleResendEmail}>
          Resend confirmation email
        </Link>
        &nbsp;or&nbsp;
        <Link to="#" className={styles.footerLink}>
          Contact support
        </Link>
      </p>
      <p>{message}</p>
    </div>
  );
}
