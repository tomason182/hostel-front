import styles from "../../styles/formDefaultStyle.module.css";
import PropTypes from "prop-types";

export default function UserForm({ refProps }) {
  return (
    <form method="dialog" className={styles.mainForm}>
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
        name="first_name"
        minLength={2}
        maxLength={50}
        required
        aria-required
      />
      <label htmlFor="lastName">Last Name</label>
      <input type="text" id="lastName" name="last_name" />
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
        >
          Cancel
        </button>
        <button type="submit" className={styles.submitBtn}>
          Save
        </button>
      </menu>
    </form>
  );
}

UserForm.propTypes = {
  refProps: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
};
