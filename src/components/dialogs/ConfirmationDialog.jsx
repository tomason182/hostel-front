import PropTypes from "prop-types";
import styles from "../../styles/ConfirmationDialog.module.css";

export default function ConfirmationDialog({
  title,
  description,
  refProps,
  handleActionFunction,
}) {
  return (
    <dialog className={styles.confirmationDialog} ref={refProps}>
      <p>{title}</p>
      <span>{description}</span>
      <div className={styles.btnContainer}>
        <button onClick={() => refProps?.current.close()}>No</button>
        <button
          className={styles.confirmBtn}
          onClick={() => {
            handleActionFunction();
            refProps?.current.close();
          }}
        >
          Yes
        </button>
      </div>
    </dialog>
  );
}

ConfirmationDialog.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  refProps: PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    .isRequired,
  handleActionFunction: PropTypes.func.isRequired,
};
