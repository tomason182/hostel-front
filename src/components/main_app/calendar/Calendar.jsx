import { format, sub, add } from "date-fns";
import styles from "../../../styles/Calendar.module.css";
import { roomTypes } from "../../../data_mocked";
import { Fragment } from "react";

export default function Calendar() {
  const today = new Date();
  const month = today.getMonth();
  const year = format(today, "yyyy");
  const MMM = format(today, "MMM");
  const dayOfMonth = format(today, "dd");
  const dayOfWeekNumber = parseInt(format(today, "e"), 10); // Empieza en domingo
  const firstDayOfWeek = sub(today, { days: dayOfWeekNumber - 1 });

  const array = Array.from({ length: 14 }, (x, i) => i);
  const weeksArray = array.map(i => add(firstDayOfWeek, { days: i }));

  console.log(weeksArray);

  const daysOfWeek = weeksArray.map((day, index) => (
    <th
      scope="col"
      key={index}
      className={styles.dates}
      style={{ textAlign: "center" }}
    >
      {format(new Date(day), "iii")}
      <br />
      {format(new Date(day), "dd")}
    </th>
  ));

  const listOfRooms = roomTypes.map(room => room.products);
  console.log(listOfRooms);

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
            <th colSpan={2}></th>
            {daysOfWeek}
          </tr>
        </thead>
        <tbody>
          {listOfRooms.map((room, index) =>
            room.map((obj, i) => {
              return (
                <Fragment key={index}>
                  <tr key={i}>
                    <th rowSpan={obj.beds.length + 1}>{obj.room_name}</th>
                  </tr>
                  {obj.beds.map((bed, j) => {
                    return (
                      <tr key={j}>
                        <th>{bed}</th>
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
