import styles from "../../../styles/ReservationInfo.module.css";
import PropTypes from "prop-types";
import { format } from "date-fns";

export default function ReservationInfo({ setToggleDisplay, reservationData }) {
  const arrivalDate = format(reservationData.check_in, "yyyy-MM-dd");
  const departureDate = format(reservationData.check_out, "yyyy-MM-dd");

  if (!reservationData) return <div>Loading...</div>;

  return (
    <div className={styles.reservationDetails}>
      <div className={styles.one}>
        <div className={styles.guestInfo}>
          <h3>{reservationData.guest_info.full_name}</h3>
          <button onClick={() => setToggleDisplay(2)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </button>
        </div>
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
          <dd>{reservationData.room_type_info.description}</dd>
          <dt>Booking Source</dt>
          <dd>{reservationData.booking_source}</dd>
          <dt>Number of guests</dt>
          <dd>{reservationData.number_of_guest}</dd>
          <dt>Total price</dt>
          <dd>$&nbsp;{reservationData.total_price}</dd>
          <dt>Reservation Status</dt>
          <dd>{reservationData.reservation_status}</dd>
          <dt>Payment Status</dt>
          <dd>{reservationData.payment_status}</dd>
          <dt>Special Request</dt>
          <dd>{reservationData.special_request}</dd>
        </dl>
      </div>
    </div>
  );
}

ReservationInfo.propTypes = {
  setToggleDisplay: PropTypes.func.isRequired,
  reservationData: PropTypes.array.isRequired,
};
