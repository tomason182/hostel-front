import { useParams, Link } from "react-router-dom";
import styles from "../../../styles/ReservationDetails.module.css";
import { useContext } from "react";
import { format } from "date-fns";
import { ReservationContext } from "../../../data_providers/ReservationsDataProvider";

export default function ReservationDetails() {
  const { id } = useParams();

  const { reservationsData } = useContext(ReservationContext);

  const reservationData = reservationsData.filter(
    reservation => reservation._id === id
  );

  console.log(reservationData);

  const arrivalDate = format(reservationData[0].check_in, "yyyy-MM-dd");
  const departureDate = format(reservationData[0].check_out, "yyyy-MM-dd");

  return (
    <div className={styles.mainContainer}>
      <Link className={styles.goBackLink} to="/app/reservations">
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
          <path d="M19 12H6M12 5l-7 7 7 7" />
        </svg>
        <span>back</span>
      </Link>
      <div className={styles.reservationDetails}>
        <div className={styles.one}>
          <h3>{reservationData[0].guest_info.full_name}</h3>
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
              {arrivalDate}
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
              {departureDate}
            </dd>
          </dl>
        </div>
        <div className={styles.two}>
          <p>Reservation Details</p>
          <dl>
            <dt>Room Type</dt>
            <dd>{reservationData[0].room_type_info.description}</dd>
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
        <p>Update this reservation</p>
        <button className={styles.btnLarge}>
          Change reservation dates & price
        </button>
        <button className={styles.btnLarge}>Change reservation details</button>
        <button className={styles.btnLarge}>Not a button</button>
        <button className={styles.btnCancel}>Cancel reservation</button>
        <button className={styles.btnPaid}>Paid</button>
      </div>
    </div>
  );
}
