import { NavLink } from "react-router-dom";
import styles from "../../styles/NavigationMain.module.css";
function NavigationMain() {
  return (
    <menu role="menu" className={styles.mainMenu}>
      <NavLink
        exact
        to="/Dashboard"
        className={styles.menuLink}
        activeClassName={styles.currentLink}
      >
        Dashboard
      </NavLink>

      <NavLink
        to="#"
        className={styles.menuLink}
        activeClassName={styles.currentLink}
      >
        Calendar
      </NavLink>

      <NavLink
        to="#"
        className={styles.menuLink}
        activeClassName={styles.currentLink}
      >
        Rates & availability
      </NavLink>

      <NavLink
        to="#"
        className={styles.menuLink}
        activeClassName={styles.currentLink}
      >
        Reservations
      </NavLink>

      <NavLink
        to="#"
        className={styles.menuLink}
        activeClassName={styles.currentLink}
      >
        Settings
      </NavLink>
    </menu>
  );
}

export default NavigationMain;
