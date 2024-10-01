import { format, add, sub } from "date-fns";
import styles from "../../../styles/RatesAvailabilityCalendar.module.css";
import { roomTypes, reservations } from "../../../data_mocked";
import { useState } from "react";

export default function RatesAvailabilityCalendar() {
  const today = new Date();
  const [startDate, setStartDate] = useState(today);
  const [handleDate, setHandleDate] = useState(today.setDate(1));

  const monthToText = format(handleDate, "MMMM yyyy");

  const handleMonthSelectionForwards = () => {
    const date = add(handleDate, { months: 1 });
    setHandleDate(date);
  };

  const handleMonthSelectionBackwards = () => {
    const date = sub(handleDate, { months: 1 });
    setHandleDate(date);
  };

  const firstDayOnGrid = sub(startDate, { days: 1 });
  const monthArray = Array.from({ length: 31 }, (_, i) =>
    add(firstDayOnGrid, { days: i })
  );

  console.log(roomTypes);
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
        {monthToText}
        <button onClick={handleMonthSelectionForwards}>forward</button>
      </div>
      <div>{dayContainer}</div>
    </div>
  );
}
