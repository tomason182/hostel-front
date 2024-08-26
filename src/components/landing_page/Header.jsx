import styles from "../../styles/HeaderLanding.module.css";
import OpenMenuBtn from "../buttons/OpenMenuBtn";
import NavigationMenu from "./NavigationMenu";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <h3>Hostel App Logo</h3>
      </div>
      <NavigationMenu />
      <OpenMenuBtn />
    </header>
  );
}

export default Header;
