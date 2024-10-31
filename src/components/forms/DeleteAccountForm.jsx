import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/DeleteAccountForm.module.css";
import ConfirmationDialog from "../dialogs/ConfirmationDialog";
import PermissionsDialog from "../dialogs/PermissionsDialog";
import MessageDialog from "../dialogs/MessageDialog";
import fetchDataHelper from "../../utils/fetchDataHelper";
import { UserProfileContext } from "../../../data_providers/UserProfileProvider";
import { useContext } from "react";

export default function DeleteAccountForm() {
  const { userProfile } = useContext(UserProfileContext);

  const [message, setMessage] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const confirmDialog = useRef(null);
  const permissionsDialogRef = useRef(null);
  const messageDialogRef = useRef(null);
  const navigate = useNavigate();

  const userRole = userProfile.user_info.role;

  const title = "Delete your account";
  const description =
    "Permanently remove your account and all associated data.";

  async function handleSubmit() {
    try {
      setLoading(true);
      const url = import.meta.env.VITE_URL_BASE + "users/accounts/delete/";
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
        console.log(data);
        setMessage("Account deleted successfully");
        setStatus("ok");
        setTimeout(() => handleLogOut(), 2400);

        return;
      }

      if (errors) {
        console.log(errors);
        setMessage("Unable to delete account. Please Contact support");
        setStatus("notOk");
        return;
      }
    } catch (err) {
      console.error(err);
      setMessage("Unable to delete account. Please Contact support");
      setStatus("notOk");
    } finally {
      setLoading(false);
    }
  }

  function handleLogOut() {
    const url = import.meta.env.VITE_URL_BASE + "users/logout";
    const options = {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };

    fetch(url, options)
      .then(response => {
        if (response.status >= 400) {
          throw new Error("Unable to log out. Try again");
        }

        navigate("/");
      })
      .catch(error => {
        console.error(error);
      });
  }

  if (loading) return <div>Deleting account...</div>;

  return (
    <>
      {userRole === "admin" ? (
        <ConfirmationDialog
          title={title}
          description={description}
          refProps={confirmDialog}
          handleActionFunction={handleSubmit}
        />
      ) : (
        <PermissionsDialog refProps={permissionsDialogRef} />
      )}
      <MessageDialog
        message={message}
        status={status}
        refProps={messageDialogRef}
        setMessage={setMessage}
        setStatus={setStatus}
      />

      <h3>Delete Your Account</h3>
      <p className={styles.pNormal}>
        Permanently remove your account and all associated data. These actions
        can not be undone
      </p>
      <button
        className={styles.btnDelete}
        disabled={loading}
        onClick={() => confirmDialog?.current.showModal()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#000000"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          <line x1="10" y1="11" x2="10" y2="17"></line>
          <line x1="14" y1="11" x2="14" y2="17"></line>
        </svg>
        Delete account
      </button>
    </>
  );
}
