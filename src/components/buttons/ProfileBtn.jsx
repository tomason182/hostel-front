import styles from "../../styles/ProfileBtn.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import MessageDialog from "../dialogs/MessageDialog";

function ProfileBtn() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const [status, setStatus] = useState(null);
  const dialogRef = useRef(null);

  const menuRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(e) {
      if (isMenuOpen && !menuRef.current?.contains(e.target)) {
        e.preventDefault();
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

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
        setMessage("Unable to logOut");
        setStatus("notOk");
      });
  }

  return (
    <div className={styles.menuBar}>
      {message && (
        <MessageDialog
          message={message}
          status={status}
          refProps={dialogRef}
          setMessage={setMessage}
          setStatus={setStatus}
        />
      )}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={styles.btn}
        type="button"
        aria-expanded="false"
        aria-haspopup="true"
        aria-labelledby="profile-btn"
      >
        <svg
          className={styles.avatar}
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
        >
          <title id="profile-btn">User profile button</title>
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx={12} cy={7} r={4}></circle>
        </svg>
      </button>
      <div
        ref={menuRef}
        className={`${styles.profileMenu} ${isMenuOpen && styles.open}`}
      >
        <Link to="users/profile/edit" onClick={() => setIsMenuOpen(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
          Profile
        </Link>
        <Link onClick={handleLogOut}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 17l5-5-5-5M19.8 12H9M13 22a10 10 0 1 1 0-20" />
          </svg>
          Log out
        </Link>
      </div>
    </div>
  );
}

export default ProfileBtn;
