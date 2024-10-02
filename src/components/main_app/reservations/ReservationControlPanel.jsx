import styles from "../../../styles/ReservationControlPanel.module.css";

export default function ReservationControlPanel() {
  return (
    <div className={styles.controlPanel}>
      <p>Update this reservation</p>
      <button className={styles.btnLarge}>
        Change reservation dates & price
      </button>
      <button className={styles.btnLarge}>Change reservation details</button>
      <button className={styles.btnLarge}>Not a button</button>
      <button className={styles.btnCancel}>Cancel reservation</button>
      <button className={styles.btnPaid}>Paid</button>
    </div>
  );
}
