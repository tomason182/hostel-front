import { format } from "date-fns";
import styles from "../../../styles/RatesAvailabilityCalendar.module.css";
import {
  roomTypes,
  reservations,
  ratesAndAvailability,
} from "../../../data_mocked";
import { Fragment } from "react";

export default function RatesAvailabilityCalendar() {
  const array = Array.from({ length: 31 }, (x, i) => i + 1);
  const today = new Date();
  const month = today.getMonth();
  const MMM = format(today, "MMM");
  const year = format(today, "yyyy");
  const daysArray = array.map(index => new Date(year, month, index));

  const listOfRooms = roomTypes.map(room => {
    return daysArray.map(day => {
      const bookings = reservations.filter(reservation => {
        const [y, m, d] = reservation.check_in_date.split("-");
        const checkIn = new Date(y, m - 1, d);
        const [yy, mm, dd] = reservation.check_out_date.split("-");
        const checkOut = new Date(yy, mm - 1, dd);

        return (
          reservation.room_type_id === room._id &&
          checkIn.getTime() <= day.getTime() &&
          checkOut.getTime() >= day.getTime()
        );
      });

      const roomAvailability = ratesAndAvailability.find(
        ra => ra.room_type_id === room._id
      );

      const customAvailability = roomAvailability
        ? roomAvailability.dates.find(date => {
            const [y, m, d] = date.start_date.split("-");
            const startDate = new Date(y, m - 1, d);
            const [yy, mm, dd] = date.end_date.split("-");
            const endDate = new Date(yy, mm - 1, dd);
            console.log(endDate === day);

            return (
              startDate.getTime() <= day.getTime() &&
              endDate.getTime() >= day.getTime()
            );
          })
        : null;

      const toSell = customAvailability
        ? customAvailability.custom_availability
        : room.max_occupancy * room.inventory;

      const standardRate = customAvailability
        ? customAvailability.standard_rate
        : room.base_rate;

      return {
        _id: room._id,
        toSell: toSell - bookings.length,
        standardRate,
        bookings: bookings.length,
        status: toSell - bookings.length > 0 ? "Open" : "Close",
      };
    });
  });

  const daysOfMonth = daysArray.map((day, index) => (
    <th
      scope="col"
      className={styles.dates}
      key={index}
      style={{ textAlign: "center" }}
    >
      {format(new Date(day), "iii")}
      <br />
      {format(new Date(day), "dd")}
    </th>
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
        <tbody>
          {listOfRooms.map((roomDays, roomIndex) => (
            <Fragment key={roomTypes[roomIndex]._id}>
              <tr>
                <th colSpan={32} id={styles.description}>
                  {roomTypes[roomIndex].description}
                </th>
              </tr>
              <tr>
                <th>Room status</th>
                {roomDays.map((dayData, dayIndex) => (
                  <td key={dayIndex}>{dayData.status}</td>
                ))}
              </tr>
              <tr>
                <th>Room to Sell</th>
                {roomDays.map((dayData, dayIndex) => (
                  <td key={dayIndex}>{dayData.toSell}</td>
                ))}
              </tr>
              <tr>
                <th>Bookings</th>
                {roomDays.map((dayData, dayIndex) => (
                  <td key={dayIndex}>{dayData.bookings}</td>
                ))}
              </tr>
              <tr>
                <th>Standard rate</th>
                {roomDays.map((dayData, dayIndex) => (
                  <td key={dayIndex}>$&nbsp;{dayData.standardRate}</td>
                ))}
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
