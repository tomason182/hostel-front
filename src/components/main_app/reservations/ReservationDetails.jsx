import { useParams } from "react-router-dom";
import styles from "../../../styles/ReservationDetails.module.css";
import { reservations } from "../../../data_mocked";

export default function ReservationDetails() {
  const { id } = useParams();

  const reservationData = reservations.filter(
    reservation => reservation._id === id
  );

  return (
    <div className={styles.mainContainer}>
      <div className={styles.reservationDetails}>
        <div className={styles.one}>
          <h3>{reservationData[0].guest_id}</h3>
          <dl>
            <dt>Arrival:</dt>
            <dd>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3" />
              </svg>
              {reservationData[0].check_in_date}
            </dd>
            <dt>Departure:</dt>
            <dd>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10 3H6a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h4M16 17l5-5-5-5M19.8 12H9" />
              </svg>
              {reservationData[0].check_out_date}
            </dd>
          </dl>
        </div>
        <div className={styles.two}>
          <p>Reservation Details</p>
          <dl>
            <dt>Room Type</dt>
            <dd>{reservationData[0].room_type_id}</dd>
            <dt>Booking Source</dt>
            <dd>{reservationData[0].booking_source}</dd>
            <dt>Number of guests</dt>
            <dd>{reservationData[0].number_of_guest}</dd>
            <dt>Total price</dt>
            <dd>$&nbsp;{reservationData[0].total_price}</dd>
            <dt>Reservation Status</dt>
            <dd>{reservationData[0].reservation_status}</dd>
            <dt>Payment Status</dt>
            <dd>{reservationData[0].payment_status}</dd>
            <dt>Special Request</dt>
            <dd>{reservationData[0].special_request}</dd>
          </dl>
        </div>
      </div>
      <div className={styles.controlPanel}>
        <h1>Control panel</h1>
      </div>
    </div>
  );
}
