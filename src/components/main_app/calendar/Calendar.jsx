import { format, sub, add } from "date-fns";
import { useState } from "react";
import styles from "../../../styles/Calendar.module.css";
import { roomTypes, reservations } from "../../../data_mocked";
import { Fragment } from "react";

export default function Calendar() {
  const today = new Date();

  /*   const dayOfWeekNumber = parseInt(format(today, "e"), 10); // Empieza en domingo */

  const [startDate, setStartDate] = useState(today);

  const year = format(startDate, "yyyy");
  const MMM = format(startDate, "MMM");

  function handleNextBtn() {
    const date = add(startDate, { days: 7 });
    setStartDate(date);
  }

  function handlePrevBtn() {
    const date = sub(startDate, { days: 7 });
    setStartDate(date);
  }

  const firstDayOfCalendar = sub(startDate, { days: 3 });
  const array = Array.from({ length: 14 }, (x, i) => i);
  const weeksArray = array.map(i => add(firstDayOfCalendar, { days: i }));
  weeksArray.map(i => i.setHours(1, 0, 0, 0));

  const daysOfWeek = weeksArray.map(day => (
    <th
      scope="col"
      key={day.toISOString()}
      id={
        format(new Date(today), "dd") === format(new Date(day), "dd")
          ? styles.today
          : ""
      }
      className={styles.dates}
      style={{ textAlign: "center" }}
    >
      <span
        style={
          format(new Date(today), "dd") === format(new Date(day), "dd")
            ? { fontSize: "0.75rem", color: "white" }
            : { fontSize: "0.75rem", color: "#7c7c7c" }
        }
      >
        {format(new Date(day), "iii")}
      </span>
      <br />
      <span
        style={
          format(new Date(today), "dd") === format(new Date(day), "dd")
            ? { fontSize: "1.25rem", color: "white" }
            : { fontSize: "1.25rem", color: "#636363" }
        }
      >
        {format(new Date(day), "dd")}
      </span>
    </th>
  ));

  const tableData = weeksArray.map(i => {
    const currentDate = format(i, "yyyy-MM-dd");
    const result = reservations.find(
      r => format(r.check_in_date, "yyyy-MM-dd") === currentDate
    );
    console.log(result);
    return <td key={i}></td>;
  });
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
          {product.beds.map((bed, i) => (
            <tr key={bed}>
              <th className={styles.beds}>{i + 1}</th>
              {tableData}
            </tr>
          ))}
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

/* {listOfRooms.map(room =>
  room.map(obj => {
    return (
      <Fragment key={obj.room_id}>
        <tr
          key={`${room._id}-${obj.room_id}`}
          className={styles.roomRow}
        >
          <th rowSpan={obj.beds.length + 1} colSpan={2}>
            {obj.room_name}
          </th>
        </tr>
        {obj.beds.map((bed, j) => {
          let skipDays = 0;

          return (
            <tr key={bed}>
              <th className={styles.beds}>{j + 1}</th>
              {weeksArray.map((day, index) => {
                if (skipDays > 0) {
                  skipDays -= 1;
                  return null;
                }
                const filteredList = reservationSchedule.filter(
                  res => res._id === bed
                );

                const hasReservation =
                  filteredList.length > 0
                    ? filteredList[0].availability?.find(date => {
                        const [y, m, d] =
                          date.check_in_date.split("-");
                        const checkInDate = new Date(y, m - 1, d);
                        checkInDate.setHours(1, 0, 0, 0);
                        day.setHours(1, 0, 0, 0);
                        const [yy, mm, dd] =
                          date.check_out_date.split("-");
                        const checkOutDate = new Date(yy, mm, dd);
                        checkOutDate.setHours(1, 0, 0, 0);

                        const overlap =
                          index === 0 &&
                          checkInDate.getDate() <
                            weeksArray[0].getDate() &&
                          checkOutDate.getDate() >=
                            weeksArray[0].getDate();
                        if (overlap) {
                          return {
                            ...date,
                            hasOverlap: weeksArray[0],
                          };
                        } else if (
                          checkInDate.getDate() === day.getDate()
                        ) {
                          return date;
                        }

                        return null;
                      })
                    : null;

                // hay que solucionar temas de fechas. Como estan en data_mocked (2024,09,18), JS toma un dia anterior.
                // Pero si del servidor viene y se guardan en la hora local, posiblemente todo este problema no lo tengamos.

                if (hasReservation) {
                  const checkInDate = hasReservation.hasOverlap
                    ? new Date(hasReservation.hasOverlap)
                    : new Date(hasReservation.check_in_date);
                  checkInDate.setHours(1, 0, 0, 0);

                  const checkOutDate = new Date(
                    hasReservation.check_out_date
                  );
                  checkOutDate.setHours(1, 0, 0, 0);

                  const nights = Math.min(
                    checkOutDate.getDate() - checkInDate.getDate(),
                    weeksArray.length - index
                  );

                  if (
                    checkOutDate.getDate() >
                    weeksArray[weeksArray.length - 1].getDate()
                  ) {
                    skipDays = weeksArray.length - index - 1;
                  } else {
                    skipDays = nights - 1;
                  }

                  return (
                    <td
                      colSpan={nights}
                      key={index}
                      style={{
                        backgroundColor: "blue",
                        color: "white",
                        paddingLeft: "1rem",
                      }}
                    >
                      {hasReservation.reserved_by}
                    </td>
                  );
                } else {
                  return <td key={index}></td>;
                }
              })}
            </tr>
          );
        })}
      </Fragment>
    );
  })
)} */
