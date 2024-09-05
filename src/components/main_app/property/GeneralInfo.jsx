import styles from "../../../styles/GeneralInfo.module.css";
import PropertyInfoSub from "./PropertyInfoSub";
import RoomTypesSub from "./RoomTypesSub";
import UsersSub from "./UsersSub";

function GeneralInfo() {
  return (
    <>
      <h3 className="dashboardTitles">General information</h3>
      <hr className="solidBreakLine" />
      <div className={styles.mainContainer}>
        <div className={styles.subContainer}>
          <h4>Property info</h4>
          <PropertyInfoSub />
        </div>
        <div className={styles.subContainer}>
          <h4>Room types</h4>
          <RoomTypesSub />
        </div>
        <div className={styles.subContainer}>
          <h4>Users</h4>
          <UsersSub />
        </div>
        <div className={styles.subContainer}>
          <h4>Active rate plans</h4>
        </div>
      </div>
    </>
  );
}

export default GeneralInfo;
