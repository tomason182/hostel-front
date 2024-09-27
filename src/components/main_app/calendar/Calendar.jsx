import { format, sub, add } from "date-fns";
import { useState } from "react";
import styles from "../../../styles/Calendar.module.css";
import { roomTypes, reservations } from "../../../data_mocked";
import { Fragment } from "react";

export default function Calendar() {
  const today = new Date();
  const [startDate, setStartDate] = useState(today);

  // Formatting year and month
  const year = format(startDate, "yyyy");
  const MMM = format(startDate, "MMM");

  const handleNextBtn = () => setStartDate(add(startDate, { days: 7 }));

  const handlePrevBtn = () => setStartDate(sub(startDate, { days: 7 }));

  // Generate weeks array

  const firstDayOfCalendar = sub(startDate, { days: 3 });
  const weeksArray = Array.from({ length: 14 }, (_, i) =>
    add(firstDayOfCalendar, { days: i })
  );

  // Helper to format day cells
  const formatDayCell = isToday => ({
    fontSize: isToday ? "1.25rem" : "0.75rem",
    color: isToday ? "white" : "#636363",
  });

  const formatDayName = isToday => ({
    fontSize: "0.75rem",
    color: isToday ? "white" : "#7c7c7c",
  });

  // Render headers (days of week)

  const daysOfWeek = weeksArray.map(day => {
    const isToday = format(today, "dd") === format(day, "dd");
    return (
      <th
        scope="col"
        key={day.toISOString()}
        className={styles.dates}
        id={isToday ? styles.today : ""}
        style={{ textAlign: "center" }}
      >
        <span style={formatDayName(isToday)}>{format(day, "iii")}</span>
        <br />
        <span style={formatDayCell(isToday)}>{format(day, "dd")}</span>
      </th>
    );
  });

  // Reservation finding logic

  function parseDate(dateString) {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  const getReservationDetails = (day, bedId, type = "find") => {
    const currentDate = format(day, "yyyy-MM-dd");

    const reservation = reservations.find(
      r =>
        r.assignedBeds.includes(bedId) &&
        r.check_in_date <= currentDate &&
        r.check_out_date > currentDate
    );

    if (!reservation) return null;

    const daysDiff =
      type === "start"
        ? Math.abs(
            parseDate(reservation.check_out_date) - parseDate(currentDate)
          )
        : Math.abs(
            parseDate(reservation.check_out_date) -
              parseDate(reservation.check_in_date)
          );

    const nights = Math.ceil(daysDiff / (1000 * 60 * 60 * 24));

    return { guestId: reservation.guest_id, nights };
  };

  // rendering list of rooms and their beds with reservations

  const listOfRooms = roomTypes.map(room => (
    <Fragment key={room._id}>
      <tr className={styles.roomRow}>
        <th colSpan={17}>{room.description}</th>
      </tr>
      {room.products.map(product => (
        <Fragment key={product.room_id}>
          <tr className={styles.roomRow}>
            <th colSpan={2} rowSpan={product.beds.length + 1}>
              {product.room_name}
            </th>
          </tr>
          {product.beds.map((bed, i) => {
            let skipDays = 0;
            return (
              <tr key={bed}>
                <th className={styles.beds}>{i + 1}</th>
                {weeksArray.map((day, index) => {
                  if (skipDays > 0) {
                    skipDays -= 1;
                    return null;
                  }

                  const reservationType = index === 0 ? "start" : "find";

                  const reservation = getReservationDetails(
                    day,
                    bed,
                    reservationType
                  );

                  if (reservation) {
                    skipDays = reservation.nights - 1;
                    const colSpan =
                      index + reservation.nights > weeksArray.length
                        ? weeksArray.length - index
                        : reservation.nights;

                    return (
                      <td key={index} colSpan={colSpan}>
                        {reservation.guestId}
                      </td>
                    );
                  }

                  return <td key={index}></td>;
                })}
              </tr>
            );
          })}
        </Fragment>
      ))}
    </Fragment>
  ));

  return (
    <div id={styles.tableContainer}>
      <table id={styles.calendarTable}>
        <thead>
          <tr>
            <th colSpan={15} style={{ textAlign: "left" }}>
              {MMM}&nbsp;
              {year}
            </th>
            <th>
              <button onClick={handlePrevBtn}>Prev</button>
            </th>
            <th>
              <button onClick={handleNextBtn}>Next</button>
            </th>
          </tr>
          <tr>
            <th colSpan={3}></th>
            {daysOfWeek}
          </tr>
        </thead>
        <tbody>{listOfRooms}</tbody>
      </table>
    </div>
  );
}
