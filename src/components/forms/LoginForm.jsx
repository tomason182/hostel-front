import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import styles from "../../styles/SignUpForm.module.css";
export default function LoginForm() {
  const [formBody, setFormBody] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [submit, setSubmit] = useState(false);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const { username, password } = e.target;

    setFormBody({
      username: username.value,
      password: password.value,
    });

    setSubmit(true);
    setErrorMessage(null);
  }

  const { data, error, loading } = useFetch(
    submit === true && formBody !== null
      ? {
          url: "http://localhost:5000/api/v1/users/auth",
          options: {
            mode: "cors",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(formBody),
          },
        }
      : { url: null, options: null }
  );

  useEffect(() => {
    if (data) {
      navigate("/app");
    }

    if (error) {
      let errorMsg = null;
      try {
        const errorObj = JSON.parse(error.message);
        errorMsg = errorObj.msg;
      } catch (err) {
        console.error(err);
        errorMsg = "An unexpected error ocurred";
      }

      setErrorMessage(errorMsg);
    }
    setSubmit(false);
  }, [data, error]);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor="username">Email address</label>
      <input
        type="email"
        id="username"
        name="username"
        required
        aria-required
        aria-labelledby="invalid"
        minLength={3}
        maxLength={50}
      />
      <label htmlFor="psw">Password</label>
      <input
        type="password"
        id="psw"
        name="password"
        required
        aria-required
        aria-labelledby="invalid"
      />
      {errorMessage && (
        <span id="invalid" className={styles.error}>
          {errorMessage}
        </span>
      )}

      <Link className={styles.extras} to="#">
        Forgot your password?
      </Link>
      <button className={styles.submitBtn} type="submit" disabled={loading}>
        {loading ? "Logging in" : "Log in"}
      </button>
    </form>
  );
}
