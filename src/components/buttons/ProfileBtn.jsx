import styles from "../../styles/ProfileBtn.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function ProfileBtn() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogOut, setIsLogOut] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLogOut) {
      navigate("/");
    }
  }, [isLogOut, navigate]);

  useEffect(() => {
    if (error) {
      alert("An Error Occurred while logging out. Please try again");
    }
  });

  function handleLogOutClick() {
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
        setError(false);
        if (response.status >= 400)
          throw new Error(
            "An unexpected error occurred logging out. Try again"
          );

        setIsLogOut(true);
      })
      .catch(error => {
        console.error(error);
        setError(true);
      });
  }

  return (
    <div className={styles.menuBar}>
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
      <div className={`${styles.profileMenu} ${isMenuOpen && styles.open}`}>
        <Link to="#">Profile</Link>
        <Link onClick={handleLogOutClick}>Log out</Link>
      </div>
    </div>
  );
}

export default ProfileBtn;
