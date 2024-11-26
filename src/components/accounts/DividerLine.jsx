import styles from "../../styles/DividerLine.module.css";

export default function DividerLine() {
  return (
    <div className={styles.dividerContainer}>
      <hr className={styles.line} />
      <span className={styles.text}>or</span>
      <hr className={styles.line} />
    </div>
  );
}
