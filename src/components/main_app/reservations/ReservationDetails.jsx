import { useParams } from "react-router-dom";

import { reservations } from "../../../data_mocked";

export default function ReservationDetails() {
  const { id } = useParams();

  const reservationData = reservations.filter(
    reservation => reservation._id === id
  );

  return (
    <>
      <div className="reservationDetails">
        <h3>{reservationData[0].guest_id}</h3>
        <span>Arrival:</span>
        <p>{reservationData[0].check_in_date}</p>
        <span>Departure:</span>
        <p>{reservationData[0].check_out_date}</p>
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
    </>
  );
}
