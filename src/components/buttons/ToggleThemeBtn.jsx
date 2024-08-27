import styles from "../../styles/ToggleThemeBtn.module.css";
import { useState } from "react";

function ToggleThemeBtn() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  function handleDarkMode() {
    setIsDarkMode(!isDarkMode);
  }

  return (
    <>
      <button className={styles.toggleBtn} onClick={handleDarkMode}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          className={`${styles.themeSwitch} ${
            isDarkMode ? styles.darkTheme : styles.lightTheme
          }`}
        >
          <path></path>
          {!isDarkMode && <circle></circle>}
        </svg>
      </button>
    </>
  );
}

export default ToggleThemeBtn;
