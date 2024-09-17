import { useState } from "react";
import styles from "../../styles/formDefaultStyle.module.css";
import PropTypes from "prop-types";
import fetchDataHelper from "../../utils/fetchDataHelper";

export default function UserForm({ refProps }) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  async function handleSubmit(e) {
    setLoading(true);
    setErrors(null);

    const { username, firstName, lastName, password, role } = e.target;

    const formBody = {
      username: username.value,
      firstName: firstName.value,
      lastName: lastName.value,
      password: password.value,
      role: role.value,
    };

    console.log(formBody);

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

      const { data, error } = await fetchDataHelper(url, options);

      if (error) {
        setErrors(errors);
        return;
      }

      if (data) {
        console.log(data);
        // handle successful data.
        return;
      }
    } catch (err) {
      console.log(err.message);
      setErrors([{ msg: err.message || "Unexpected error occurred" }]);
    } finally {
      setLoading(false);
    }
  }
  return (
    <form method="dialog" className={styles.mainForm} onSubmit={handleSubmit}>
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
          type="reset"
          className={styles.resetBtn}
          onClick={() => refProps.current?.close()}
          disabled={loading}
        >
          Cancel
        </button>
        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>
      </menu>
    </form>
  );
}

UserForm.propTypes = {
  refProps: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
};
