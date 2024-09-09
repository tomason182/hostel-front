import { format } from "date-fns";
import styles from "../../../styles/RatesAvailabilityCalendar.module.css";
import { roomTypes, reservations } from "../../../data_mocked";
import { Fragment } from "react";

export default function RatesAvailabilityCalendar() {
  const array = Array.from({ length: 31 }, (x, i) => i + 1);
  const today = new Date();
  const month = today.getMonth();
  const MMM = format(today, "MMM");
  const year = format(today, "yyyy");
  const firstDay = new Date(year, month, "01");
  const lastDay = new Date(year, month, "31");
  const daysArray = array.map(index => new Date(year, month, index));

  const bookings = reservations.filter(
    r =>
      new Date(r.check_out_date) >= firstDay &&
      new Date(r.check_in_date) <= lastDay
  );

  const daysOfMonth = daysArray.map((day, index) => (
    <th scope="col" id={styles.dates} key={index}>
      {format(new Date(day), "iii")}
      <br />
      {format(new Date(day), "dd")}
    </th>
  ));

  const rooms = roomTypes.map(room => (
    <Fragment key={room._id}>
      <tr key={room._id}>
        <th colSpan={32} id={styles.description}>
          {room.description}
        </th>
      </tr>
      <tr>
        <th>Room status</th>
        {daysArray.map((day, index) => (
          <td key={index} ref={day}>
            {room.max_occupancy * room.inventory > room.booking
              ? "Open"
              : "Close"}
          </td>
        ))}
      </tr>
      <tr>
        <th>Rooms to sell</th>
        {daysArray.map((day, index) => (
          <td key={index} ref={day}>
            {room.max_occupancy * room.inventory}
          </td>
        ))}
      </tr>
      <tr>
        <th>Booking</th>
        {daysArray.map((day, index) => (
          <td key={index} ref={day}>
            {bookings.map(booking =>
              new Date(day) >= new Date(booking.check_in_date) &&
              new Date(day) <= new Date(booking.check_out_date)
                ? 1
                : 0
            )}
          </td>
        ))}
      </tr>
      <tr>
        <th>Standard rate</th>
        {array.map(day => (
          <td key={day}>$ {room.base_rate}</td>
        ))}
      </tr>
    </Fragment>
  ));

  return (
    <div className={styles.tableContainer}>
      <table className={styles.ratesAndAvailability}>
        <thead>
          <tr>
            <th id={styles.mainDate}>
              {MMM}&nbsp;
              {year}
            </th>
          </tr>
          <tr>
            <th></th>
            {daysOfMonth}
          </tr>
        </thead>
        <tbody>{rooms}</tbody>
      </table>
    </div>
  );
}
