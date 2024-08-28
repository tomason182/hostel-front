import { NavLink } from "react-router-dom";
import styles from "../../styles/NavigationMain.module.css";
function NavigationMain() {
  return (
    <menu role="menu" id={styles.mainMenu}>
      <NavLink
        exact
        to="home"
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
        Home
      </NavLink>

      <NavLink
        to="calendar"
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
        Calendar
      </NavLink>

      <NavLink
        to="rates-and-availability"
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
        Rates & availability
      </NavLink>

      <NavLink
        to="reservations"
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
        Reservations
      </NavLink>

      <NavLink
        to="property"
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
        Property
      </NavLink>
    </menu>
  );
}

export default NavigationMain;
