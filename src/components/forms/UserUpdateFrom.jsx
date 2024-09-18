import styles from "../../styles/formDefaultStyle.module.css";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export default function UserUpdateForm({ formRef, userValues }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (userValues) {
      setFirstName(userValues.firstName || "");
      setLastName(userValues.lastName || "");
      setRole(userValues.role || "");
    }
  }, [userValues]);
  return (
    <form className={styles.mainForm} ref={formRef}>
      <label>
        First Name
        <input
          type="text"
          name="firstName"
          minLength={2}
          maxLength={50}
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          required
          aria-required
        />
      </label>
      <label>
        Last Name
        <input
          type="text"
          name="lastName"
          minLength={2}
          maxLength={50}
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
      </label>
      <fieldset>
        <legend>Change user role?</legend>
        <div className={styles.radioContainer}>
          <label>
            Admin
            <input
              type="radio"
              name="role"
              value="admin"
              checked={role === "admin"}
              onChange={e => setRole(e.target.value)}
            />
          </label>
        </div>
        <div className={styles.radioContainer}>
          <label>
            Manager
            <input
              type="radio"
              name="role"
              value="manager"
              checked={role === "manager"}
              onChange={e => setRole(e.target.value)}
            />
          </label>
        </div>
        <div className={styles.radioContainer}>
          <label>
            Employee
            <input
              type="radio"
              name="role"
              value="employee"
              checked={role === "employee"}
              onChange={e => setRole(e.target.value)}
            />
          </label>
        </div>
      </fieldset>
      <menu className={styles.buttonContainer}>
        <button>Delete user</button>
        <button>Update user</button>
      </menu>
    </form>
  );
}

UserUpdateForm.propTypes = {
  formRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  userValues: PropTypes.object,
};
