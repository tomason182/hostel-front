import styles from "../../styles/Notifications.module.css";

export default function Notifications() {
  return (
    <div className={styles.mainContainer}>
      <h3>Notifications</h3>
      <div className={styles.content}>
        <h4>No notifications yet</h4>
        <p>
          Stay tuned. Updates and important information about the application
          will appear here
        </p>
      </div>
    </div>
  );
}
