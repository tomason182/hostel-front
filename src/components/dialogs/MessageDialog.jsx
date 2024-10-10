import PropTypes from "prop-types";
import styles from "../../styles/MessageDialog.module.css";
import { useEffect } from "react";

export default function MessageDialog({
  message,
  status,
  refProps,
  setMessage,
  setStatus,
}) {
  useEffect(() => {
    if (message) {
      refProps.current?.showModal();

      setTimeout(() => {
        refProps.current?.close();
        setMessage(null);
        setStatus(null);
      }, 2300);
    }
  });
  return (
    <dialog
      ref={refProps}
      className={`${styles.messageDialog} ${
        status === "ok" ? styles.success : styles.error
      }`}
    >
      <p>{message}</p>
    </dialog>
  );
}

MessageDialog.propTypes = {
  message: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  refProps: PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    .isRequired,
  setMessage: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
};
