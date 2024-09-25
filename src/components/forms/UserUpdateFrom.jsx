import styles from "../../styles/formDefaultStyle.module.css";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import fetchDataHelper from "../../utils/fetchDataHelper";
import ErrorComponent from "../error_page/ErrorComponent";

export default function UserUpdateForm({
  refProps,
  userValues,
  refreshUsersData,
  setSuccessfulMsg,
  setIsDialogOpen,
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userValues) {
      setFirstName(userValues.firstName || "");
      setLastName(userValues.lastName || "");
      setRole(userValues.role || "");
      setUserId(userValues.userId || "");
      setError(null);
    }
  }, [userValues]);

  useEffect(() => {
    function handleEscKey(e) {
      if (e.keyCode === 27) {
        e.preventDefault();
        setIsDialogOpen(false);
        refProps.current?.close();
      }
    }
    window.addEventListener("keydown", handleEscKey);

    return () => window.removeEventListener("keydown", handleEscKey);
  }, [refProps, setIsDialogOpen]);

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    const formBody = {
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
      ...(role && { role }),
    };

    try {
      const url =
        import.meta.env.VITE_URL_BASE + "users/profile/edit/" + userId;
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
        console.log("user updated successfully", data);
        setSuccessfulMsg("User Updated successfully");
        setIsDialogOpen(false);
        refreshUsersData();
        refProps.current?.close();
        return;
      }

      if (errors) {
        setError(errors);
        return;
      }
    } catch (err) {
      console.error("An error occurred".err.message);
      setError([{ msg: err.message || "Unexpected error ocurred" }]);
    } finally {
      setLoading(false);
    }
  }

  async function handleUserDelete() {
    setLoading(true);
    try {
      const url =
        import.meta.env.VITE_URL_BASE + "users/profile/delete/" + userId;

      const options = {
        mode: "cors",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      };

      const { data, errors } = await fetchDataHelper(url, options);

      if (data) {
        console.log("User deleted successfully", data);
        setSuccessfulMsg("User deleted successfully");
        refreshUsersData();
        setIsDialogOpen(false);
        refProps.current?.close();
        return;
      }

      if (errors) {
        setError(errors);
        return;
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div>Loading...</div>;

  return (
    <form className={styles.mainForm} onSubmit={handleSubmit}>
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
        <button type="button" disabled={loading} onClick={handleUserDelete}>
          Delete user
        </button>
        <button type="submit" disabled={loading}>
          Update user
        </button>
      </menu>
      {error && <ErrorComponent errors={error} />}
    </form>
  );
}

UserUpdateForm.propTypes = {
  refProps: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  userValues: PropTypes.object.isRequired,
  refreshUsersData: PropTypes.func.isRequired,
  setSuccessfulMsg: PropTypes.func.isRequired,
  setIsDialogOpen: PropTypes.func.isRequired,
};
