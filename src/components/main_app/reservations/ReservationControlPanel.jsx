import styles from "../../../styles/ReservationControlPanel.module.css";
import PropTypes from "prop-types";
import { useRef } from "react";

export default function ReservationControlPanel({ reservationId }) {
  const cancelDialogRef = useRef(null);
  const noShowDialogRef = useRef(null);

  function handlePaymentStatusUpdate(paymentStatus) {
    const url =
      import.meta.env.VITE_URL_BASE +
      "reservations/payment_status/" +
      reservationId;
    const options = {
      mode: "cors",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ payment_status: paymentStatus }),
    };

    fetch(url, options)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(err => console.error(err));
  }
  function handleReservationStatusUpdate(status) {
    const url =
      import.meta.env.VITE_URL_BASE + "reservations/status/" + reservationId;

    const options = {
      mode: "cors",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ reservation_status: status }),
    };

    fetch(url, options)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(err => console.error(err));
  }

  return (
    <div className={styles.controlPanel}>
      <p>Update this reservation</p>
      <button className={styles.btnLarge}>
        Change reservation dates & price
      </button>
      <button className={styles.btnLarge}>Change reservation details</button>
      <button className={styles.btnLarge}>Not a button</button>
      <button
        className={styles.btnCancel}
        onClick={() => cancelDialogRef?.current.showModal()}
      >
        Cancel reservation
      </button>
      <dialog ref={cancelDialogRef}>
        <p>Cancel this reservation?</p>
        <button onClick={() => cancelDialogRef?.current.close()}>No</button>
        <button
          onClick={() => {
            handleReservationStatusUpdate("canceled");
            cancelDialogRef?.current.close();
          }}
        >
          Yes
        </button>
      </dialog>
      <button
        className={styles.btnCancel}
        onClick={() => noShowDialogRef?.current.showModal()}
      >
        Mark as no-show
      </button>
      <dialog ref={noShowDialogRef}>
        <p>Mark reservation as no-show?</p>
        <button onClick={() => noShowDialogRef?.current.close()}>No</button>
        <button onClick={() => handleReservationStatusUpdate("no_show")}>
          Yes
        </button>
      </dialog>
      <button
        className={styles.btnPaid}
        onClick={() => handlePaymentStatusUpdate("paid")}
      >
        Mark as Paid
      </button>
    </div>
  );
}

ReservationControlPanel.propTypes = {
  reservationId: PropTypes.string.isRequired,
};
