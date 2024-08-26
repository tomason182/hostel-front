import styles from "../../styles/OpenMenuBtn.module.css";

function OpenMenuBtn() {
  return (
    <button
      type="button"
      className={styles.btn}
      aria-controls="mobile-menu"
      aria-expanded="false"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-labelledby="mobile-menu"
        height={24}
        width={24}
        viewBox="0 0 24 24"
      >
        <title id="mobile-menu">Open mobile menu</title>
        <path d="M4 7h22M4 15h22M4 23h22"></path>
      </svg>
    </button>
  );
}

export default OpenMenuBtn;
