import { Link } from "react-router-dom";
import styles from "../../styles/MainMenuResponsive.module.css";
import SideBarMenu from "./SideBarMenu";
import { useState } from "react";

export default function MainMenuResponsive() {
  const [toggle, setToggle] = useState(0);
  const [isClicked, setIsClicked] = useState(false);

  return (
    <>
      {isClicked ? (
        <SideBarMenu setIsClicked={setIsClicked} />
      ) : (
        <menu className={styles.menu}>
          <Link
            to="/app"
            onClick={() => setToggle(0)}
            className={toggle === 0 ? styles.active : undefined}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9" />
              <path d="M9 22V12h6v10M2 10.6L12 2l10 8.6" />
            </svg>
            <span>Home</span>
          </Link>

          <Link
            to="/app/calendar"
            onClick={() => setToggle(1)}
            className={toggle === 1 ? styles.active : undefined}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>Calendar</span>
          </Link>

          <Link
            to="/app/reservations"
            onClick={() => setToggle(2)}
            className={toggle === 2 ? styles.active : undefined}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
            <span>Reservations</span>
          </Link>

          <Link
            to=""
            onClick={() => {
              setToggle(3);
              setIsClicked(true);
            }}
            className={toggle === 3 ? styles.active : undefined}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="19" cy="12" r="1"></circle>
              <circle cx="5" cy="12" r="1"></circle>
            </svg>
            <span>More</span>
          </Link>
        </menu>
      )}
    </>
  );
}
