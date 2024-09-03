import styles from "../../styles/SignUpForm.module.css";
import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";

function SignUpForm() {
  const [formBody, setFormBody] = useState(null);
  const [errorMessage, setErrorMessage] = useState(false);
  const [submit, setSubmit] = useState(false);

  function handleClick(event) {
    event.preventDefault();

    const { name, property_name, username, password, psw_confirm } =
      event.target;

    if (password.value !== psw_confirm.value) {
      setErrorMessage("Passwords don't match");
    } else {
      setErrorMessage(null);
      setFormBody({
        name: name.value,
        propertyName: property_name.value,
        username: username.value,
        password: password.value,
      });

      setSubmit(true);
    }
  }

  const { data, error, loading } = useFetch(
    submit && formBody !== null
      ? {
          url: "http://localhost:5000/api/v1/users/register",
          options: {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formBody),
          },
        }
      : null
  );

  console.log(data, error, loading);

  return (
    <form className={styles.form} onSubmit={handleClick}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="first_name"
        required
        aria-required
        minLength={2}
        maxLength={50}
      />
      <label htmlFor="property_name">Property name</label>
      <input
        type="text"
        id="property_name"
        name="property_name"
        required
        aria-required
        minLength={2}
        maxLength={100}
      />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="username"
        required
        aria-required
        minLength={5}
        maxLength={50}
      />
      <label htmlFor="psw">Password</label>
      <input
        type="password"
        id="psw"
        name="password"
        required
        aria-required
        aria-labelledby="psw_requirements"
        minLength={14}
        pattern="(^(?=(?:.*\d){2,})(?=(?:.*[a-z]){4,})(?=(?:.*[A-Z]){2,})(?=(?:.*[\W_]){2,}).+$)"
      />
      <label htmlFor="psw_confirm">Password confirmation</label>
      <input
        type="password"
        id="psw_confirm"
        name="psw_confirm"
        required
        aria-required
      />
      {errorMessage && (
        <span className={styles.error}>Passwords don&#39;t match</span>
      )}
      <p id="psw_requirements" className={styles.info}>
        <small>
          Password must contain at least 14 characters, 4 lower case letters,
          two upper case letters, two digits and two special characters
        </small>
      </p>
      <button className={styles.submitBtn} type="submit">
        Sign up
      </button>
    </form>
  );
}

export default SignUpForm;
