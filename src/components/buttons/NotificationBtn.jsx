import styles from "../../styles/NotificationBtn.module.css";
function NotificationBtn() {
  return (
    <button
      type="button"
      aria-expanded="true"
      aria-haspopup="true"
      aria-labelledby="notification-btn"
      className={styles.btn}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={styles.svgImg}
        height={24}
        width={24}
        viewBox="0 0 24 24"
      >
        <title id="notification-btn">Notification button</title>
        <path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"></path>
      </svg>
    </button>
  );
}

export default NotificationBtn;
