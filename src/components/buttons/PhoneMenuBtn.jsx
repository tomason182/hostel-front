import styles from "../../styles/PhoneMenuBtn.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function PhoneMenuBtn() {
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
          <div className={styles.titleContainer}>
            <h1>Simple Hostel.</h1>
          </div>
          <Link to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#555"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9" />
              <path d="M9 22V12h6v10M2 10.6L12 2l10 8.6" />
            </svg>
            Home
          </Link>
          <Link to="/pricing">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#555"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
              <line x1="7" y1="7" x2="7.01" y2="7"></line>
            </svg>
            Pricing
          </Link>
          <Link to="/contact-us">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#555"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
              <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
            </svg>
            Contact
          </Link>
          <Link to="/about-us">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#555"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            About As
          </Link>
          <Link to="/accounts/login">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#555"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 3h6v18h-6M10 17l5-5-5-5M13.8 12H3" />
            </svg>
            Sign In
          </Link>
          <Link to="/accounts/signup">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#555"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            Create Account
          </Link>
        </nav>
      </div>
    </>
  );
}

export default PhoneMenuBtn;
