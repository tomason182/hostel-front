import styles from "../../styles/ProfileEditForm.module.css";

export default function PasswordEditForm() {
  return (
    <>
      <h3>Change your password</h3>
      <form className={styles.userEditForm}>
        <label>
          Current password
          <input type="password" name="currentPassword" />
        </label>
        <label>
          New password
          <input type="password" name="newPassword" />
        </label>
        <label>
          Confirm password
          <input type="password" name="confirmPassword" />
        </label>
        <button type="submit">Save</button>
      </form>
    </>
  );
}
