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
      <NavLink
        to="/app/property/general-info"
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
        Property
      </NavLink>
    </menu>
  );
}

export default NavigationMain;
