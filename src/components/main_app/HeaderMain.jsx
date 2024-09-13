import ProfileBtn from "../buttons/ProfileBtn";
import ToggleThemeBtn from "../buttons/ToggleThemeBtn";
import NotificationBtn from "../buttons/NotificationBtn";
import MainSearch from "../forms/MainSearch";
import styles from "../../styles/HeaderMain.module.css";
import PropTypes from "prop-types";

function HeaderMain({ user }) {
  return (
    <header className={styles.header}>
      <h1>Page Logo</h1>
      <MainSearch />
      <div className={styles.info}>
        <div className={styles.hostelInfo}>
          <h3>{user ? user.property_name : "Loading user name"}</h3>
          <p>{user ? user.user_info.first_name : "Guest"}</p>
        </div>
        <NotificationBtn />
        <ToggleThemeBtn />
        <ProfileBtn />
      </div>
    </header>
  );
}

HeaderMain.propTypes = {
  user: PropTypes.object,
};

export default HeaderMain;
