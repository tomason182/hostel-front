import { useState } from "react";
import styles from "../../styles/formDefaultStyle.module.css";
import { useParams, useNavigate } from "react-router-dom";
import fetchDataHelper from "../../utils/fetchDataHelper";
import ErrorComponent from "../error_page/ErrorComponent";

export default function ResetPassword() {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);
      setMessage(null);
      const newPassword = e.target.newPass.value;
      const repeatNewPassword = e.target.repeatNewPass.value;

      if (newPassword !== repeatNewPassword) {
        setError([{ msg: "Password do not match" }]);
        return false;
      }
      const url =
        import.meta.env.VITE_URL_BASE +
        "users/reset-password/finish-change-pass/" +
        token;

      const options = {
        mode: "cors",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword, repeatNewPassword }),
      };

      const { data, errors } = await fetchDataHelper(url, options);

      if (data) {
        console.log(data);
        setMessage(
          "Password modified successfully. You will be redirect to the login page"
        );
        setTimeout(() => navigate("/accounts/login"), 2000);

        return;
      }
      if (errors) {
        console.log(errors);
        errors.map(err =>
          err.msg === "jwt expired"
            ? setError([
                {
                  msg: "Token has expired. Please resend the token and try again.",
                },
              ])
            : setError(errors)
        );
      }
    } catch (err) {
      console.error(err);
      setError([{ msg: err.message || "Unexpected error occurred" }]);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className={styles.formContainer}>
      <h1>Reset your Password</h1>
      <form className={styles.mainForm} onSubmit={handleSubmit}>
        <label>
          New password
          <input type="password" name="newPass" required aria-required />
        </label>
        <label>
          Repeat new password
          <input type="password" name="repeatNewPass" required aria-required />
        </label>
        <menu className={styles.buttonContainer}>
          <button className={styles.submitBtn} disabled={loading}>
            Reset Password
          </button>
        </menu>
      </form>
      <div>{error && <ErrorComponent errors={error} />}</div>
      <div className={styles.success}>{message}</div>
    </div>
  );
}
