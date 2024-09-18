import styles from "../../styles/DialogHeader.module.css";
import PropTypes from "prop-types";

export default function DialogHeader({
  title,
  refProps,
  formRef,
  handleCloseBtn,
}) {
  return (
    <div className={styles.dialogHeader}>
      <h3>{title}</h3>
      <button
        type="button"
        onClick={() => {
          handleCloseBtn(refProps, formRef); // attach the function handleCloseBtn to the button
        }}
      >
        <svg
          xmlns="http://w3.org/2000/svg"
          aria-label="Dialog close button"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          className={styles.dialogCloseIcon}
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  );
}

DialogHeader.propTypes = {
  title: PropTypes.string,
  refProps: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  formRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  handleCloseBtn: PropTypes.func.isRequired,
};
