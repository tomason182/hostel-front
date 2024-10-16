import styles from "../../styles/Content.module.css";

export default function Content() {
  return (
    <div className={styles.mainContent}>
      <div className={styles.mainTitle}>
        <h1>
          Your Way into <span>Simple Hostel Management</span> Start Here
        </h1>
        <p>Join for free</p>
      </div>
    </div>
  );
}
