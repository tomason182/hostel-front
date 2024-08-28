import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import styles from "../../styles/NavigationMain.module.css";
function NavigationMain() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  let location = useLocation();

  const isPropertyActive = location.pathname.includes("/property");

  return (
    <menu role="menu" id={styles.mainMenu}>
      <NavLink
        to="/app"
        className={() => (location.pathname === "/app" ? styles.active : "")}
      >
        Home
      </NavLink>

      <NavLink
        to="/app/calendar"
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
        Calendar
      </NavLink>

      <NavLink
        to="/app/rates-and-availability"
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
        Rates & availability
      </NavLink>

      <NavLink
        to="/app/reservations"
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
        Reservations
      </NavLink>

      {/* Dropdown Menu for Property */}
      <div
        className={`${styles.propertyDropdownContainer} ${
          isPropertyActive ? styles.active : ""
        }`}
        tabIndex="0"
        onMouseEnter={() => setIsDropdownOpen(true)}
        onMouseLeave={() => setIsDropdownOpen(false)}
      >
        <span
          className={styles.propertyDropdownLabel}
          aria-label="Property menu"
          role="button"
        >
          Property
        </span>
        <div
          className={`${styles.propertyDropdown} ${
            isDropdownOpen ? styles.open : ""
          } `}
        >
          <NavLink to="/app/property/general-info">General info</NavLink>
          <NavLink to="/app/property/property-details">
            Property details
          </NavLink>
          <NavLink to="/app/property/room-types">Room types</NavLink>

          <NavLink to="/property/users">Users</NavLink>
        </div>
      </div>
    </menu>
  );
}

export default NavigationMain;
