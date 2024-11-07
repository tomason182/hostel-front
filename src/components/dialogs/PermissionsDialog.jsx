import styles from "../../styles/PermissionsDialog.module.css";
import PropType from "prop-types";

export default function PermissionsDialog({ refProps }) {
  return (
    <dialog ref={refProps} className={styles.dialog}>
      <div className={styles.content}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="41"
          height="41"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#000000"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
        <h3>Access denied</h3>
        <p>You don&apos;t have permissions to access this page.</p>
        <p>Contact an administrator or manager</p>
        <button onClick={() => refProps?.current.close()}>Close</button>
      </div>
    </dialog>
  );
}

PermissionsDialog.propTypes = {
  refProps: PropType.shape({ current: PropType.instanceOf(Element) }),
};
