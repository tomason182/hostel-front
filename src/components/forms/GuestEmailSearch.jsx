import styles from "../../styles/formDefaultStyle.module.css";
import PropTypes from "prop-types";

export default function GuestEmailSearch({ setIndex }) {
  return (
    <form className={styles.mainForm}>
      <label>
        Guest email
        <input type="email" name="email" required aria-required />
      </label>
      <menu className={styles.buttonContainer}>
        <button className={styles.resetBtn}>Cancel</button>
        <button className={styles.submitBtn} onClick={() => setIndex(1)}>
          Continue
        </button>
      </menu>
    </form>
  );
}

GuestEmailSearch.propTypes = {
  setIndex: PropTypes.func.isRequired,
};
