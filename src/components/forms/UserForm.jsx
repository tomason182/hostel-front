import { useState, useEffect } from "react";
import styles from "../../styles/formDefaultStyle.module.css";
import PropTypes from "prop-types";
import fetchDataHelper from "../../utils/fetchDataHelper";
import ErrorComponent from "../error_page/ErrorComponent";

export default function UserForm({
  refProps,
  formRef,
  handleCloseBtn,
  error,
  setError,
}) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function handleEscKeyOnUser(e) {
      if (e.keyCode === 27) {
        e.preventDefault();
        handleCloseBtn(refProps, formRef);
      }
    }
    window.addEventListener("keydown", handleEscKeyOnUser);

    return () => window.removeEventListener("keydown", handleEscKeyOnUser);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { username, firstName, lastName, password, role } = e.target;

    const formBody = {
      username: username.value,
      firstName: firstName.value,
      lastName: lastName.value,
      password: password.value,
      role: role.value,
    };

    try {
      const url = import.meta.env.VITE_URL_BASE + "users/create";
      const options = {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formBody),
      };

      const { data, errors } = await fetchDataHelper(url, options);

      if (errors) {
        console.log(errors);
        setError(errors);
      }

      if (data) {
        console.log(data);
        // handle successful data.
        refProps.current?.close();
      }
    } catch (err) {
      console.log(err.message);
      setError([{ msg: err.message || "Unexpected error occurred" }]);
    } finally {
      setLoading(false);
    }
  }
  return (
    <form className={styles.mainForm} onSubmit={handleSubmit} ref={formRef}>
      <label htmlFor="username">User&#39;s Email</label>
      <input
        type="email"
        id="username"
        name="username"
        minLength={3}
        maxLength={50}
        required
        aria-required
      />
      <label htmlFor="firstName">First Name</label>
      <input
        type="text"
        id="firstName"
        name="firstName"
        minLength={2}
        maxLength={50}
        required
        aria-required
      />
      <label htmlFor="lastName">Last Name</label>
      <input type="text" id="lastName" name="lastName" />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="password" />
      <fieldset>
        <legend>Select a role for the user</legend>
        <div className={styles.radioContainer}>
          <label htmlFor="admin">Admin</label>
          <input type="radio" id="admin" name="role" value="admin" />
        </div>
        <div className={styles.radioContainer}>
          <label htmlFor="manager">Manager</label>
          <input type="radio" id="manager" name="role" value="manager" />
        </div>
        <div className={styles.radioContainer}>
          <label htmlFor="employee">Employee</label>
          <input
            type="radio"
            id="employee"
            name="role"
            value="employee"
            defaultChecked
          />
        </div>
      </fieldset>
      <menu className={styles.buttonContainer}>
        <button
          className={styles.resetBtn}
          onClick={() => {
            handleCloseBtn(refProps, formRef);
            setError(null);
          }}
          disabled={loading}
        >
          Cancel
        </button>
        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>
      </menu>
      {error && <ErrorComponent errors={error} />}
    </form>
  );
}

UserForm.propTypes = {
  refProps: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  formRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  handleCloseBtn: PropTypes.func.isRequired,
  error: PropTypes.array.isRequired,
  setError: PropTypes.func.isRequired,
};
