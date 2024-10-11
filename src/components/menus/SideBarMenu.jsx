import { Link } from "react-router-dom";
import styles from "../../styles/SideBarMenu.module.css";
import PropTypes from "prop-types";
export default function SideBarMenu({ setIsClicked }) {
  return (
    <>
      <div className={styles.blurContent}></div>
      <nav className={styles.sidebarNav}>
        <button type="button" onClick={() => setIsClicked(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-labelledby="close-menu"
            aria-hidden="true"
            height={30}
            width={30}
            viewBox="0 0 30 30"
          >
            <title id="close-sidebar-menu">Close mobile menu</title>
            <path d="M7 7 L23 23 M7 23 L23 7"></path>
          </svg>
        </button>
        <Link to="#">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="22"
            height="22"
          >
            <path d="M4 1h16v22H4V1z" fill="none" strokeWidth="1.5" />
            <rect
              x="10"
              y="16"
              width="4"
              height="6"
              fill="none"
              strokeWidth="1.5"
            />
            <rect
              x="6"
              y="3"
              width="1.5"
              height="2"
              fill="none"
              strokeWidth="1.5"
            />
            <rect
              x="6"
              y="9"
              width="1.5"
              height="2"
              fill="none"
              strokeWidth="1.5"
            />
            <rect
              x="11"
              y="3"
              width="1.5"
              height="2"
              fill="none"
              strokeWidth="1.5"
            />
            <rect
              x="11"
              y="9"
              width="1.5"
              height="2"
              fill="none"
              strokeWidth="1.5"
            />

            <rect
              x="16"
              y="3"
              width="1.5"
              height="2"
              fill="none"
              strokeWidth="1.5"
            />
            <rect
              x="16"
              y="9"
              width="1.5"
              height="2"
              fill="none"
              strokeWidth="1.5"
            />
          </svg>
          Property
        </Link>
        <Link to="#">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          Rates & availability
        </Link>
        <Link to="#">
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
          Account
        </Link>
        <Link to="#">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 17l5-5-5-5M19.8 12H9M13 22a10 10 0 1 1 0-20" />
          </svg>
          Log out
        </Link>
      </nav>
    </>
  );
}

SideBarMenu.propTypes = {
  setIsClicked: PropTypes.func.isRequired,
};
