import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "../../styles/SignUpForm.module.css";
export default function LoginForm() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      navigate("/app");
    }
  }, [data, navigate]);

  function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    if (error !== null) {
      setError(null);
    }

    const formBody = {
      username: e.target.username.value,
      password: e.target.password.value,
    };

    const url = import.meta.env.VITE_URL_BASE + "users/auth";
    const options = {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formBody),
    };

    fetch(url, options)
      .then(async response => {
        if (response.status >= 400) {
          const errorObj = await response.json();
          const errorMessage = errorObj.msg ? errorObj?.msg : "Server Error";
          throw new Error(errorMessage);
        }

        return response.json();
      })
      .then(response => setData(response))
      .catch(err => setError(err.message))
      .finally(setLoading(false));
  }

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
      {error && (
        <span id="invalid" className={styles.error}>
          {error}
        </span>
      )}

      <Link className={styles.extras} to="/accounts/reset-password">
        Forgot your password?
      </Link>
      <button className={styles.submitBtn} type="submit" disabled={loading}>
        {loading ? "Logging in" : "Log in"}
      </button>
    </form>
  );
}
