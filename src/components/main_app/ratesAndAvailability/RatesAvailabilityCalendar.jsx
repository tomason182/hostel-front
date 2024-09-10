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
  const daysArray = array.map(index => new Date(year, month, index));

  const listOfRooms = roomTypes.map(room => {
    return daysArray.map(day => {
      const bookings = reservations.filter(reservation => {
        const checkIn = new Date(reservation.check_in_date);
        const checkOut = new Date(reservation.check_out_date);

        return (
          reservation.room_type_id === room._id &&
          checkIn <= day &&
          checkOut > day
        );
      });

      return {
        _id: room._id,
        toSell: room.max_occupancy * room.inventory - bookings.length,
        standardRate: room.base_rate,
        bookings: bookings.length,
        status:
          room.max_occupancy * room.inventory - bookings.length > 0
            ? "Open"
            : "Close",
      };
    });
  });

  const daysOfMonth = daysArray.map((day, index) => (
    <th scope="col" id={styles.dates} key={index}>
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
