import { format, add, sub } from "date-fns";
import styles from "../../../styles/RatesAvailabilityCalendar.module.css";
import { roomTypes, reservations } from "../../../data_mocked";
import { useState } from "react";

export default function RatesAvailabilityCalendar() {
  const today = new Date();
  const [startDate, setStartDate] = useState(today);

  const handleMonthSelectionForwards = () => {
    const date = add(startDate, { day: 1 });
    setStartDate(date);
  };

  const handleMonthSelectionBackwards = () => {
    const date = sub(startDate, { day: 1 });
    setStartDate(date);
  };

  const firstDayOnGrid = startDate;
  const monthArray = Array.from({ length: 10 }, (_, i) =>
    add(firstDayOnGrid, { days: i })
  );

  // Find rates and availability function
  function handleRatesAndAvailability(date, room) {
    const result = room.rates_and_availability.find(
      raa => new Date(raa.start_date) <= date && new Date(raa.end_date) >= date
    );
    return result;
  }

  // Render grid container
  const dayContainer = monthArray.map(day => {
    const isToday = format(today, "yyyyMMdd") === format(day, "yyyyMMdd");
    const currentDate = format(day, "EEEE, do MMMM");
    return (
      <div
        key={day.getTime()}
        className={styles.dayContainer}
        id={isToday ? styles.isToday : ""}
      >
        <h3>{currentDate}</h3>
        <div key={day.toISOString()} className={styles.roomsContainer}>
          {roomTypes.map(room => {
            const ratesAndAvailability = handleRatesAndAvailability(day, room);
            const occupancy = ratesAndAvailability
              ? ratesAndAvailability.custom_availability
              : room.max_occupancy * room.inventory;
            const rate = ratesAndAvailability
              ? ratesAndAvailability.custom_rate
              : room.base_rate;
            const bookings = 4;

            return (
              <div key={room._id} className={styles.roomTypeContainer}>
                {room.description}
                <dl>
                  <div className={styles.dlContainer}>
                    <dt>Occupancy</dt>
                    <dd>{occupancy}</dd>
                  </div>
                  <div className={styles.dlContainer}>
                    <dt>availability</dt>
                    <dd>{occupancy - bookings}</dd>
                  </div>
                  <div className={styles.dlContainer}>
                    <dt>Bookings</dt>
                    <dd>{bookings}</dd>
                  </div>
                  <div className={styles.dlContainer}>
                    <dt>Rates</dt>
                    <dd>{rate}</dd>
                  </div>
                  <div className={styles.dlContainer}>
                    <dt>Status</dt>
                    <dd>Open</dd>
                  </div>
                </dl>
              </div>
            );
          })}
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="monthSelection">
        <button onClick={handleMonthSelectionBackwards}>back</button>
        <button onClick={handleMonthSelectionForwards}>forward</button>
      </div>
      <div>{dayContainer}</div>
    </div>
  );
}
