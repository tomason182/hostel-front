import styles from "../../styles/OpenMenuBtn.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function OpenMenuBtn() {
  const [isClicked, setIsClicked] = useState(false);

  function handleClick() {
    setIsClicked(!isClicked);
  }
  return (
    <>
      <button
        type="button"
        className={styles.btn}
        aria-controls="mobile-menu"
        aria-expanded="false"
        onClick={handleClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-labelledby="mobile-menu"
          height={24}
          width={24}
          viewBox="0 0 24 24"
        >
          <title id="mobile-menu">Open mobile menu</title>
          <path d="M4 7h22M4 15h22M4 23h22"></path>
        </svg>
      </button>
      <div
        className={`${styles.blurContent} ${isClicked ? styles.showBlur : ""}`}
      >
        <nav
          className={`${styles.menu} ${isClicked ? styles.showMenu : ""} `}
          role="navigation"
        >
          <button
            type="button"
            className={styles.btnClose}
            onClick={handleClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-labelledby="close-menu"
              aria-hidden="true"
              height={30}
              width={30}
              viewBox="0 0 30 30"
            >
              <title id="close-menu">Close mobile menu</title>
              <path d="M7 7 L23 23 M7 23 L23 7"></path>
            </svg>
          </button>
          <h1>The Hostel Project</h1>
          <Link>Home</Link>
          <Link>Services</Link>
          <Link>Pricing</Link>
          <Link>Contact</Link>
          <Link>About As</Link>
          <Link>Sign In</Link>
          <Link>Create Account</Link>
        </nav>
      </div>
    </>
  );
}

export default OpenMenuBtn;
