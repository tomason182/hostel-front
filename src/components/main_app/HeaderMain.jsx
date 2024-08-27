import ProfileBtn from "../buttons/ProfileBtn";
import ToggleThemeBtn from "../buttons/ToggleThemeBtn";
import NotificationBtn from "../buttons/NotificationBtn";
import styles from "../../styles/HeaderMain.module.css";

function HeaderMain() {
  return (
    <header className={styles.header}>
      <h1>Page Logo</h1>
      <div className={styles.info}>
        <div className={styles.hostelInfo}>
          <h3>Hostel name</h3>
          <p>Username</p>
        </div>
        <NotificationBtn />
        <ToggleThemeBtn />
        <ProfileBtn />
      </div>
    </header>
  );
}

export default HeaderMain;
