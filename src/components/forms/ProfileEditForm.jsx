import styles from "../../styles/ProfileEditForm.module.css";

export default function ProfileEditForm() {
  return (
    <>
      <h3>Profile</h3>
      <form className={styles.userEditForm}>
        <label>
          First Name
          <input type="text" name="firstName" />
        </label>
        <label>
          Last Name
          <input type="text" name="lastName" />
        </label>
        <label>
          Email
          <input type="email" name="email" />
        </label>
        <label>
          Role
          <input type="text" name="role" disabled />
        </label>
        <button type="submit">Save</button>
      </form>
    </>
  );
}
