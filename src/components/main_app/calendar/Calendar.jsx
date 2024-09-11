import { format, sub, add } from "date-fns";
import styles from "../../../styles/RatesAvailabilityCalendar.module.css";

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

  return (
    <div className={styles.tableContainer}>
      <table className={styles.ratesAndAvailability}>
        <thead>
          <tr>
            <th>
              {MMM}&nbsp;
              {year}
            </th>
          </tr>
          <tr>
            <th></th>
            {daysOfWeek}
          </tr>
        </thead>
      </table>
    </div>
  );
}
