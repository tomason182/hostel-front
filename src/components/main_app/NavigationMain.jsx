import { NavLink, useLocation } from "react-router-dom";
import styles from "../../styles/NavigationMain.module.css";
function NavigationMain() {
  let location = useLocation();
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
      <div className={styles.propertyDropdownContainer} tabIndex="0">
        <span
          className={styles.propertyLink}
          aria-label="Property menu"
          role="button"
        >
          Property
        </span>
        <ul className={styles.propertyDropdown} role="menu">
          <li role="menuitem">
            <NavLink
              to="/app/property/general-info"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              General info
            </NavLink>
          </li>
          <li role="menuitem">
            <NavLink
              to="/app/property/property-details"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Property details
            </NavLink>
          </li>
          <li role="menuitem">
            <NavLink
              to="/app/property/room-types"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Room types
            </NavLink>
          </li>
          <li role="menuitem">
            <NavLink
              to="/property/users"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Users
            </NavLink>
          </li>
        </ul>
      </div>
    </menu>
  );
}

export default NavigationMain;
