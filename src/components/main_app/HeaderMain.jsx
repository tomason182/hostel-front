import ProfileBtn from "../buttons/ProfileBtn";
import ToggleThemeBtn from "../buttons/ToggleThemeBtn";
import NotificationBtn from "../buttons/NotificationBtn";
import MainSearch from "../forms/MainSearch";
import styles from "../../styles/HeaderMain.module.css";
import { UserProfileContext } from "../../data_providers/UserProfileProvider";
import { useContext } from "react";

function HeaderMain() {
  const { userProfile } = useContext(UserProfileContext);

  return (
    <header className={styles.header}>
      <h1>Booquing.com</h1>
      <MainSearch />
      <div className={styles.info}>
        <div className={styles.hostelInfo}>
          <h3>
            {userProfile ? userProfile.property_name : "Loading user name"}
          </h3>
          <p>
            Hello, {userProfile ? userProfile.user_info.first_name : "Guest"}
          </p>
        </div>
        <NotificationBtn />
        <ToggleThemeBtn />
        <ProfileBtn />
      </div>
    </header>
  );
}

export default HeaderMain;
