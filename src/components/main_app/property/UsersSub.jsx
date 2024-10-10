import { useRef, useState } from "react";
import styles from "../../../styles/RoomTypesSub.module.css";
import PropTypes from "prop-types";
import ConfirmationDialog from "../../dialogs/ConfirmationDialog";
import fetchDataHelper from "../../../utils/fetchDataHelper";
import ErrorComponent from "../../error_page/ErrorComponent";

export default function UsersSub({
  refProps,
  usersData,
  setUserValues,
  setIsDialogOpen,
  setSuccessfulMsg,
  refreshUsersData,
}) {
  const deleteUserRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

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
        return;
      }

      if (errors) {
        setError(errors);
        return;
      }
    } catch (err) {
      setError([{ msg: err.message || "Unexpected error occurred" }]);
    } finally {
      setLoading(false);
    }
  }

  if (!usersData || loading === true) return <div>Loading...</div>;

  const users =
    usersData &&
    usersData.map(user => (
      <li key={user._id}>
        <div>
          <p>
            {user.first_name}&nbsp;{user.last_name}
          </p>
        </div>
        <div>
          <p>{user.username}</p>
        </div>

        <div className={styles.info}>
          <span>{user.role}</span>
        </div>
        <div className={styles.btnMenu}>
          <button
            onClick={() => {
              setUserValues({
                userId: user._id,
                firstName: user.first_name,
                lastName: user.last_name,
                role: user.role,
              });
              setIsDialogOpen(true);
              refProps.current?.showModal();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="14 2 18 6 7 17 3 17 3 13 14 2"></polygon>
              <line x1="3" y1="22" x2="21" y2="22"></line>
            </svg>
          </button>
          <button
            disabled={loading}
            onClick={() => {
              setUserId(user._id);
              deleteUserRef?.current.showModal();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </button>
        </div>
      </li>
    ));

  const title = "Delete this user?";
  const description =
    "User will not longer be able to log in into this account";

  return (
    <>
      <ConfirmationDialog
        title={title}
        description={description}
        refProps={deleteUserRef}
        handleActionFunction={handleUserDelete}
      />
      <ul className={styles.roomTypesList}>{users}</ul>
      {error && <ErrorComponent errors={error} />}
    </>
  );
}

UsersSub.propTypes = {
  refProps: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  setUserValues: PropTypes.func.isRequired,
  usersData: PropTypes.array.isRequired,
  setIsDialogOpen: PropTypes.func.isRequired,
  setSuccessfulMsg: PropTypes.func,
  refreshUsersData: PropTypes.func,
};
