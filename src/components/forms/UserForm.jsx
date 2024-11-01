import { useState } from "react";
import styles from "../../styles/formDefaultStyle.module.css";
import PropTypes from "prop-types";
import fetchDataHelper from "../../utils/fetchDataHelper";
import ErrorComponent from "../error_page/ErrorComponent";

export default function UserForm({
  refProps,
  setMessage,
  setStatus,
  refreshUsersData,
  setIsDialogOpen,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

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
        // handle successful data.
        setMessage("User added successfully");
        setStatus("ok");
        setIsDialogOpen(false);
        refreshUsersData();
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
    <form className={styles.mainForm} onSubmit={handleSubmit}>
      <label>
        User&#39;s Email
        <input
          type="email"
          name="username"
          minLength={3}
          maxLength={50}
          required
          aria-required
          autoComplete="off"
        />
      </label>
      <label>
        First Name
        <input
          type="text"
          name="firstName"
          minLength={2}
          maxLength={50}
          required
          aria-required
        />
      </label>
      <label>
        Last Name
        <input type="text" name="lastName" minLength={2} maxLength={50} />
      </label>
      <label>
        Password
        <input type="password" name="password" autoComplete="off" />
      </label>
      <fieldset>
        <legend>Select a role for the user</legend>
        <div className={styles.radioContainer}>
          <label>
            Manager
            <input type="radio" name="role" value="manager" />
          </label>
        </div>
        <div className={styles.radioContainer}>
          <label>
            Employee
            <input type="radio" name="role" value="employee" defaultChecked />
          </label>
        </div>
      </fieldset>
      <menu className={styles.buttonContainer}>
        <button
          className={styles.resetBtn}
          onClick={() => {
            setIsDialogOpen(false);
            refProps.current?.close();
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
  setMessage: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
  refreshUsersData: PropTypes.func.isRequired,
  setIsDialogOpen: PropTypes.func.isRequired,
};
