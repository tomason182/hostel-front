import { Link, useParams } from "react-router-dom";
import styles from "../../styles/EmailConfirmationPage.module.css";
import { useEffect, useState } from "react";

export default function EmailValidationPage() {
  const [isValid, setIsValid] = useState(false);
  const [title, setTitle] = useState(null);
  const [message, setMessage] = useState(null);
  const { token } = useParams();

  useEffect(() => {
    function handleTokenValidation() {
      const url =
        import.meta.env.VITE_URL_BASE + "users/confirm-email/" + token;
      const options = {
        mode: "cors",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      fetch(url, options)
        .then(response => {
          if (response.ok === true) {
            setTitle("Email Verified Successfully");
            setMessage(
              "Your email has been confirmed! Your account is now active, and you can access all features of SimpleHostel."
            );
            setIsValid(true);
            return null;
          } else {
            return response.json();
          }
        })
        .then(data => {
          if (data) {
            setTitle("Email Verification Issue");
            setIsValid(false);
            if (data.msg === "jwt expired") {
              setMessage(
                "The verification link has expired. Please request a new link to complete your email verification."
              );
            } else {
              setTitle(
                "An unexpected error occurred. Please try again or request a new verification link."
              );
            }
          }
        })
        .catch(err => {
          console.error(err.msg);
          setTitle("Connection Error");
          setMessage(
            "We encountered a network issue. Please check your connection and try again later."
          );
          setIsValid(false);
        });
    }

    handleTokenValidation();
  }, [token]);
  return (
    <div className={styles.mainContent}>
      <h1>{title}</h1>
      <p>{message}</p>

      {isValid ? (
        <Link to="/accounts/login" className={styles.link}>
          Log in into your account
        </Link>
      ) : (
        <Link className={styles.linkSecondary}>Resend token</Link>
      )}
    </div>
  );
}
