import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import styles from "../../styles/NavigationMain.module.css";
function NavigationMain() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  let location = useLocation();

  const isPropertyActive = location.pathname.includes("/property");

  useEffect(() => {
    function handleClicksOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setIsDropdownOpen(false);
    }

    if (isDropdownOpen === true) {
      document.addEventListener("click", handleClicksOutside);
    } else {
      document.removeEventListener("click", handleClicksOutside);
    }

    return () => document.removeEventListener("click", handleClicksOutside);
  }, [isDropdownOpen]);

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
      <div className={styles.propertyDropdownContainer}>
        <a
          className={isPropertyActive ? styles.active : ""}
          href="#"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          ref={dropdownRef}
        >
          Property
        </a>
        {isDropdownOpen && (
          <div
            className={`${styles.propertyDropdown} ${
              isDropdownOpen ? styles.open : ""
            }`}
          >
            <NavLink to="/app/property/general-info">General info</NavLink>
            <NavLink to="/app/property/property-details">
              Property details
            </NavLink>
            <NavLink to="/app/property/room-types">Room types</NavLink>
            <NavLink to="/property/users">Users</NavLink>
          </div>
        )}
      </div>
    </menu>
  );
}

export default NavigationMain;
