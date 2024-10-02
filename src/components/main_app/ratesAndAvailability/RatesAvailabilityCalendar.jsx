import { format, add, sub } from "date-fns";
import styles from "../../../styles/RatesAvailabilityCalendar.module.css";
import { RoomTypeContext } from "../../../data_providers/RoomTypesDataProvider";
import { useState, useContext, useEffect } from "react";

export default function RatesAvailabilityCalendar() {
  const today = new Date();
  const [startDate, setStartDate] = useState(today);
  const [reservationsData, setReservationsData] = useState([]);

  /* console.log(reservationsData); */

  const { roomTypeData } = useContext(RoomTypeContext);

  useEffect(() => {
    function fetchBookingData(from, to) {
      const fromFormatted = format(from, "yyyyMMdd");
      const toFormatted = format(to, "yyyyMMdd");
      const url =
        import.meta.env.VITE_URL_BASE +
        "reservations/simple/" +
        fromFormatted +
        "-" +
        toFormatted;
      const options = {
        mode: "cors",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      };

      fetch(url, options)
        .then(response => response.json())
        .then(data => setReservationsData(data.msg))
        .catch(err =>
          console.error(err.message || "Error fetching reservations data")
        );
    }

    const fromDate = startDate;
    const toDate = add(startDate, { days: 7 });
    fetchBookingData(fromDate, toDate);
  }, [startDate]);

  const handleMonthSelectionForwards = () => {
    const date = add(startDate, { days: 7 });
    setStartDate(date);
  };

  const handleMonthSelectionBackwards = () => {
    const date = sub(startDate, { days: 7 });
    setStartDate(date);
  };

  const firstDayOnGrid = startDate;
  const monthArray = Array.from({ length: 7 }, (_, i) =>
    add(firstDayOnGrid, { days: i })
  );

  // Find rates and availability function
  function handleRatesAndAvailability(date, room) {
    const result = room.rates_and_availability.find(
      raa => new Date(raa.start_date) <= date && new Date(raa.end_date) >= date
    );
    return result;
  }

  // Find amount of bookings for certain date
  function handleBookingsCount(date, room, reservations) {
    const formattedDate = parseInt(format(date, "yyyyMMdd"));
    const roomReservations = reservations.filter(
      reservation => reservation.room_type_id === room._id
    );

    const reservationCount = roomReservations.filter(rr => {
      const formattedCheckIn = parseInt(
        format(new Date(rr.check_in), "yyyyMMdd")
      );
      const formattedCheckOut = parseInt(
        format(new Date(rr.check_out), "yyyyMMdd")
      );

      return (
        formattedCheckIn <= formattedDate && formattedCheckOut > formattedDate
      );
    });

    const bookingsCount =
      reservationCount.length === 0
        ? 0
        : reservationCount
            .map(r => r.number_of_guest)
            .reduce((acc, currentValue) => acc + currentValue);

    return bookingsCount;
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
          {roomTypeData &&
            roomTypeData.map(room => {
              const ratesAndAvailability = handleRatesAndAvailability(
                day,
                room
              );
              const occupancy = ratesAndAvailability
                ? ratesAndAvailability.custom_availability
                : room.max_occupancy * room.inventory;
              const rate = ratesAndAvailability
                ? ratesAndAvailability.custom_rate
                : room.base_rate;
              const bookings =
                reservationsData.length !== 0
                  ? handleBookingsCount(day, room, reservationsData)
                  : 0;

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
