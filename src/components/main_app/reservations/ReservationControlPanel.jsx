import styles from "../../../styles/ReservationControlPanel.module.css";
import PropTypes from "prop-types";
import ChangeReservationsDetailsForm from "../../forms/ChangeReservationDetailsForm";
import DialogHeader from "../../dialogs/DialogHeader";
import MessageDialog from "../../dialogs/MessageDialog";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function ReservationControlPanel({
  reservationId,
  reservationData,
  refreshData,
}) {
  const cancelDialogRef = useRef(null);
  const noShowDialogRef = useRef(null);
  const changeDetailsRef = useRef(null);
  const messageDialog = useRef(null);
  const [isReservationDetailsOpen, setIsReservationDetailsOpen] =
    useState(false);
  const [message, setMessage] = useState(null);
  const [status, setStatus] = useState(null);

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
      .catch(err => console.error(err))
      .finally(refreshData());
  }

  return (
    <div className={styles.controlPanel}>
      {message && (
        <MessageDialog
          message={message}
          status={status}
          refProps={messageDialog}
          setMessage={setMessage}
          setStatus={setStatus}
        />
      )}
      <dialog ref={changeDetailsRef} className="dialog">
        {isReservationDetailsOpen && (
          <>
            <DialogHeader
              title={"Reservation Details"}
              refProps={changeDetailsRef}
              setIsDialogOpen={setIsReservationDetailsOpen}
            />
            <ChangeReservationsDetailsForm
              id={reservationId}
              data={reservationData}
              refProps={changeDetailsRef}
              setIsDialogOpen={setIsReservationDetailsOpen}
              setMessage={setMessage}
              setStatus={setStatus}
            />
          </>
        )}
      </dialog>

      <p>Update this reservation</p>
      <button className={styles.btnLarge}>
        Change reservation dates & price
      </button>
      <button
        className={styles.btnLarge}
        onClick={() => {
          setIsReservationDetailsOpen(true);
          changeDetailsRef?.current.showModal();
        }}
      >
        Change reservation details
      </button>
      <button className={`${styles.btnLarge} ${styles.disable}`}>
        Not a button
      </button>
      <button
        className={styles.btnCancel}
        onClick={() => cancelDialogRef?.current.showModal()}
      >
        Cancel reservation
      </button>
      <dialog className={styles.confirmationDialog} ref={cancelDialogRef}>
        <p>Cancel this reservation?</p>
        <span>
          Cancelled reservations are not logger be display on the Calendar, but
          you can still find them on the reservations tab{" "}
        </span>
        <div className={styles.btnContainer}>
          <button onClick={() => cancelDialogRef?.current.close()}>No</button>
          <button
            className={styles.confirmBtn}
            onClick={() => {
              handleReservationStatusUpdate("canceled");
              setMessage("Reservation canceled");
              setStatus("ok");
              cancelDialogRef?.current.close();
            }}
          >
            Yes
          </button>
        </div>
      </dialog>
      <button
        className={styles.btnCancel}
        onClick={() => noShowDialogRef?.current.showModal()}
      >
        Mark as no-show
      </button>
      <dialog ref={noShowDialogRef} className={styles.confirmationDialog}>
        <p>Mark reservation as no-show?</p>
        <span>
          Marking reservation as now-show will no longer display the reservation
          in the calendar, but you can still find it on the reservation tab
        </span>
        <div className={styles.btnContainer}>
          <button onClick={() => noShowDialogRef?.current.close()}>No</button>
          <button
            className={styles.confirmBtn}
            onClick={() => {
              handleReservationStatusUpdate("no_show");
              setMessage("Reservation marked as no-show");
              setStatus("ok");
              noShowDialogRef?.current.close();
            }}
          >
            Yes
          </button>
        </div>
      </dialog>
      <button
        className={`${styles.btnPaid} ${styles.btnLarge}`}
        onClick={() => handlePaymentStatusUpdate("paid")}
      >
        Mark as Paid
      </button>
      <Link className={styles.goBackLink} to="/app/reservations">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#000000"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="19 20 9 12 19 4 19 20"></polygon>
          <line x1="5" y1="19" x2="5" y2="5"></line>
        </svg>
        Back
      </Link>
    </div>
  );
}

ReservationControlPanel.propTypes = {
  reservationId: PropTypes.string.isRequired,
  reservationData: PropTypes.object.isRequired,
  refreshData: PropTypes.func.isRequired,
};
