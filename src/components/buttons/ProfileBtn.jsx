import styles from "../../styles/ProfileBtn.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function ProfileBtn() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
        <Link to="#">Log out</Link>
      </div>
    </div>
  );
}

export default ProfileBtn;
