import styles from "../../styles/HeaderLanding.module.css";
import PhoneMenuBtn from "../buttons/PhoneMenuBtn";
import NavigationMenu from "./NavigationMenu";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <h3>Hostel App Logo</h3>
      </div>
      <NavigationMenu />
      <PhoneMenuBtn />
    </header>
  );
}

export default Header;
