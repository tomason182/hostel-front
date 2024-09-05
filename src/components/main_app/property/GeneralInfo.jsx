import styles from "../../../styles/GeneralInfo.module.css";

function GeneralInfo() {
  return (
    <>
      <h3 className="dashboardTitles">General information</h3>
      <hr className="solidBreakLine" />
      <div className={styles.mainContainer}>
        <div className={styles.subContainer}>
          <h4>Property info</h4>
        </div>
        <div className={styles.subContainer}>
          <h4>Room types</h4>
        </div>
        <div className={styles.subContainer}>
          <h4>Users</h4>
        </div>
        <div className={styles.subContainer}>
          <h4>Active rate plans</h4>
        </div>
      </div>
    </>
  );
}

export default GeneralInfo;
