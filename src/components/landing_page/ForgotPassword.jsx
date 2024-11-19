import { useState } from "react";
import styles from "../../styles/ForgotPassword.module.css";
import formStyles from "../../styles/formDefaultStyle.module.css";
import { Helmet } from "react-helmet";
export default function ForgotPassword() {
  const [message, setMessage] = useState(null);
  const [status, setStatus] = useState(null);

  function handleSendResetLink(e) {
    e.preventDefault();
    const username = e.target.email.value;
    const url =
      import.meta.env.VITE_URL_BASE + "users/reset-password/init-change-pass/";
    const options = {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    };

    fetch(url, options)
      .then(r => {
        if (r.ok === true) {
          setMessage(
            "A password reset link has been sent to your email. Please check your inbox to proceed."
          );
          setStatus("ok");
          return null;
        } else {
          return r.json();
        }
      })
      .then(data => {
        if (data) {
          setMessage(data.msg);
          setStatus("notOk");
        }
      })
      .catch(err => {
        setMessage("A network error occurred. Please try again later");
        setStatus("notOk");
        console.error(err);
      });
  }

  return (
    <>
      <Helmet>
        <title>Reset Password | Simple Hostel</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className={styles.mainContent}>
        <h1>Forgot Your Password?</h1>
        <p>
          Don&apos;t worry, we&apos;ve got you covered! Enter your registered
          email address below, and we&apos;ll send you a link to reset your
          password. Just follow the instructions in the email to regain access
          to your account.
        </p>
        <form className={formStyles.mainForm} onSubmit={handleSendResetLink}>
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
              Request reset link
            </button>
          </menu>
        </form>
        <div className={status === "ok" ? styles.success : styles.error}>
          {message}
        </div>
      </div>
    </>
  );
}
