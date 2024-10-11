import styles from "../../styles/ProfileEditForm.module.css";
import PropTypes from "prop-types";
import fetchDataHelper from "../../utils/fetchDataHelper";

export default function PasswordEditForm({ setMessage, setStatus }) {
  async function handleFormSubmit(e) {
    e.preventDefault();

    try {
      const formBody = {
        currentPassword: e.target.currentPassword.value,
        newPassword: e.target.newPassword.value,
        repeatNewPassword: e.target.confirmPassword.value,
      };

      if (formBody.newPassword !== formBody.repeatNewPassword) {
        throw new Error("Passwords doesn't match");
      }

      const url = import.meta.env.VITE_URL_BASE + "users/profile/change-pass/";
      const options = {
        mode: "cors",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formBody),
      };

      const { data, errors } = await fetchDataHelper(url, options);

      if (data) {
        console.log(data);
        setMessage("Password updated successfully");
        setStatus("ok");
      }

      if (errors) {
        console.error(errors);
        if (errors.length === 1) {
          setMessage(errors[0].msg);
        } else {
          setMessage("Unable to update password. Please try again");
        }

        setStatus("notOk");
      }
    } catch (err) {
      const ErrorMessage = err.message || "Unexpected error ocurred";
      setMessage(ErrorMessage);
      setStatus("notOk");
    }
  }

  return (
    <>
      <h3>Change your password</h3>
      <form className={styles.userEditForm} onSubmit={handleFormSubmit}>
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

PasswordEditForm.propTypes = {
  setMessage: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
};
