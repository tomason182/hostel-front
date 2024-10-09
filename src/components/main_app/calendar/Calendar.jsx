import { format, sub, add } from "date-fns";
import styles from "../../../styles/Calendar.module.css";
import { Fragment } from "react";
import PropTypes from "prop-types";

export default function Calendar({
  roomTypes,
  reservations,
  startDate,
  setStartDate,
}) {
  const today = new Date();
  // Formatting year and month
  const year = format(startDate, "yyyy");
  const MMM = format(startDate, "MMMM");

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
    const isToday = format(today, "yyyyMMdd") === format(day, "yyyyMMdd");
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

  if (!reservations || !roomTypes) return <p>Loading...</p>;

  // Reservation finding logic

  function parseDate(dateString) {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  function handleReservationClassName(reservation) {
    const expr = parseInt(format(today, "yyyyMMdd"));
    const checkIn = parseInt(format(reservation.checkIn, "yyyyMMdd"));
    const checkOut = parseInt(format(reservation.checkOut, "yyyyMMdd"));
    let statusClassName = "confirmed";

    if (checkOut <= expr) {
      statusClassName = "checkedOut";
    } else if (checkIn <= expr && checkOut > expr) {
      statusClassName = "inHouse";
    } else {
      statusClassName = reservation.status;
    }

    return statusClassName;
  }

  const getReservationDetails = (day, bedId, type = "find") => {
    const currentDate = format(day, "yyyy-MM-dd");

    const reservation = reservations.find(
      r =>
        r.assigned_beds.includes(bedId) &&
        format(r.check_in, "yyyy-MM-dd") <= currentDate &&
        format(r.check_out, "yyyy-MM-dd") > currentDate
    );

    if (
      !reservation ||
      (reservation.reservation_status !== "confirmed" &&
        reservation.reservation_status !== "provisional")
    )
      return null;

    const checkIn = format(reservation.check_in, "yyyy-MM-dd");
    const checkOut = format(reservation.check_out, "yyyy-MM-dd");

    const daysDiff =
      type === "start"
        ? Math.abs(parseDate(checkOut) - parseDate(currentDate))
        : Math.abs(parseDate(checkOut) - parseDate(checkIn));

    const nights = Math.ceil(daysDiff / (1000 * 60 * 60 * 24));

    return {
      guestName: reservation.guest_info.full_name,
      checkIn: reservation.check_in,
      checkOut: reservation.check_out,
      status: reservation.reservation_status,
      nights,
    };
  };

  // rendering list of rooms and their beds with reservations

  const listOfRooms = roomTypes.map(room => (
    <Fragment key={`${room._id}-${room.property_id}`}>
      <tr className={styles.roomRow}>
        <th colSpan={17} key={room._id}>
          <p className={styles.roomDescription}>{room.description}</p>
        </th>
      </tr>
      {room.products.map(product => (
        <Fragment key={`${product.beds}-${room._id}`}>
          <tr className={styles.roomRow}>
            <th
              key={product.room_id}
              colSpan={2}
              rowSpan={product.beds.length + 1}
            >
              <p className={styles.roomName}>{product.room_name}</p>
            </th>
          </tr>
          {product.beds.map((bed, i) => {
            let skipDays = 0;
            return (
              <tr key={bed} className={styles.rows}>
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
                    const statusClassName =
                      handleReservationClassName(reservation);

                    return (
                      <td
                        key={index}
                        colSpan={colSpan}
                        className={`${styles.guestName} ${styles[statusClassName]}`}
                      >
                        {reservation.guestName}
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
            <th colSpan={15}>
              <h3 className={styles.monthDisplay}>
                {MMM}&nbsp;
                {year}
              </h3>
            </th>
            <th>
              <button onClick={handlePrevBtn} className={styles.arrowBtn}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="38"
                  height="38"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
            </th>
            <th>
              <button onClick={handleNextBtn} className={styles.arrowBtn}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="38"
                  height="38"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
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

Calendar.propTypes = {
  roomTypes: PropTypes.array.isRequired,
  reservations: PropTypes.array.isRequired,
  startDate: PropTypes.object.isRequired,
  setStartDate: PropTypes.func.isRequired,
};
