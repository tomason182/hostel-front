import { format, sub, add } from "date-fns";
import styles from "../../../styles/Calendar.module.css";
import { roomTypes, reservationSchedule } from "../../../data_mocked";
import { Fragment } from "react";

export default function Calendar() {
  const today = new Date();
  const year = format(today, "yyyy");
  const MMM = format(today, "MMM");
  const dayOfWeekNumber = parseInt(format(today, "e"), 10); // Empieza en domingo
  const firstDayOfWeek = sub(today, { days: dayOfWeekNumber - 1 });

  const array = Array.from({ length: 14 }, (x, i) => i);
  const weeksArray = array.map(i => add(firstDayOfWeek, { days: i }));

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

  const listOfRooms = roomTypes.map(room => room.products);

  return (
    <div id={styles.tableContainer}>
      <table id={styles.calendarTable}>
        <thead>
          <tr>
            <th>
              {MMM}&nbsp;
              {year}
            </th>
          </tr>
          <tr>
            <th colSpan={3}></th>
            {daysOfWeek}
          </tr>
        </thead>
        <tbody>
          {listOfRooms.map(room =>
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
                                  checkInDate.setHours(0, 0, 0, 0);
                                  day.setHours(0, 0, 0, 0);
                                  return checkInDate.getTime() === day.getTime()
                                    ? date
                                    : null;
                                })
                              : null;

                          if (hasReservation) {
                            const checkInDate = new Date(
                              hasReservation.check_in_date
                            );
                            const checkOutDate = new Date(
                              hasReservation.check_out_date
                            );
                            const nights =
                              (checkOutDate - checkInDate) /
                              (1000 * 60 * 60 * 24);
                            skipDays = nights - 1;

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
          )}
        </tbody>
      </table>
    </div>
  );
}
