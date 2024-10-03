import styles from "../../../styles/ReservationControlPanel.module.css";
import PropTypes from "prop-types";

export default function ReservationControlPanel({ reservationId }) {
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

    console.log(url);
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
        onClick={() => handleReservationStatusUpdate("canceled")}
      >
        Cancel reservation
      </button>
      <button
        className={styles.btnCancel}
        onClick={() => handleReservationStatusUpdate("no_show")}
      >
        Mark as no-show
      </button>
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
