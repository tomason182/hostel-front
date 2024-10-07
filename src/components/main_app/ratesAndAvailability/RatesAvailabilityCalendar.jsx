import { format, add, sub } from "date-fns";
import styles from "../../../styles/RatesAvailabilityCalendar.module.css";
import { RoomTypeContext } from "../../../data_providers/RoomTypesDataProvider";
import { useState, useContext, useEffect, useRef } from "react";
import RatesAndAvailabilityForm from "../../forms/RatesAndAvailabilityForm";
import DialogHeader from "../../dialogs/DialogHeader";

export default function RatesAvailabilityCalendar() {
  const today = new Date();
  const [startDate, setStartDate] = useState(today);
  const [reservationsData, setReservationsData] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const dialogRef = useRef(null);

  const { roomTypeData, refreshRoomTypeData } = useContext(RoomTypeContext);

  useEffect(() => {
    function fetchBookingData(date) {
      const from = date;
      const to = add(from, { days: 7 });
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

    fetchBookingData(startDate);
  }, [startDate]);

  const handleDateSelectionForwards = () => {
    const date = add(startDate, { days: 7 });
    setStartDate(date);
  };

  const handleDateSelectionBackwards = () => {
    const date = sub(startDate, { days: 7 });
    setStartDate(date);
  };

  const monthArray = Array.from({ length: 7 }, (_, i) =>
    add(startDate, { days: i })
  );

  // Find rates and availability function
  function handleRatesAndAvailability(date, room) {
    const result = room.rates_and_availability.find(
      raa => new Date(raa.start_date) <= date && new Date(raa.end_date) >= date
    );
    return result;
  }

  function ListOfBookingsForCurrentDate(date, room, reservations) {
    const formattedDate = parseInt(format(date, "yyyyMMdd"));
    const roomReservations = reservations.filter(
      reservation => reservation.room_type_id === room._id
    );

    const reservationList = roomReservations.filter(rr => {
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

    return reservationList;
  }

  // Handle availability when custom availability is set up
  function handleCustomAvailability(reservations, ratesAndAvailabilityObj) {
    const bookingsCount = reservations.map(
      r => r.created_At > ratesAndAvailabilityObj.created_At
    );
    return bookingsCount;
  }

  // Find amount of bookings for certain date
  function handleBookingsCount(reservations) {
    const bookingsCount = reservations
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
              const occupancy = room.max_occupancy * room.inventory;
              const rate = ratesAndAvailability
                ? ratesAndAvailability.custom_rate
                : room.base_rate;
              const listOfReservations =
                reservationsData.length !== 0
                  ? ListOfBookingsForCurrentDate(day, room, reservationsData)
                  : 0;

              const bookingsCount =
                listOfReservations.length !== 0
                  ? handleBookingsCount(listOfReservations)
                  : 0;
              const availability =
                ratesAndAvailability &&
                ratesAndAvailability.custom_availability !== occupancy
                  ? handleCustomAvailability(
                      listOfReservations,
                      ratesAndAvailability
                    )
                  : occupancy - bookingsCount;

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
                      <dd>{availability}</dd>
                    </div>
                    <div className={styles.dlContainer}>
                      <dt>Bookings</dt>
                      <dd>{bookingsCount}</dd>
                    </div>
                    <div className={styles.dlContainer}>
                      <dt>Rates</dt>
                      <dd>{rate}</dd>
                    </div>
                    <div className={styles.dlContainer}>
                      <dt>Status</dt>
                      <dd>{availability === 0 ? "Close" : "Open"}</dd>
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
    <div className={styles.mainContainer}>
      {roomTypeData && (
        <dialog ref={dialogRef} className="dialog">
          <DialogHeader
            title={"Rates and Availability"}
            refProps={dialogRef}
            setIsDialogOpen={setIsDialogOpen}
          />
          {isDialogOpen && (
            <RatesAndAvailabilityForm
              roomTypeData={roomTypeData}
              propRef={dialogRef}
              refreshRoomTypeData={refreshRoomTypeData}
            />
          )}
        </dialog>
      )}

      <div className={styles.editContainer}>
        <button
          onClick={() => {
            setIsDialogOpen(true);
            dialogRef?.current.showModal();
          }}
        >
          Bulk Edit
        </button>
      </div>
      <div className={styles.dateSelectionContainer}>
        <button
          onClick={handleDateSelectionBackwards}
          disabled={format(today, "yyyyMMdd") === format(startDate, "yyyyMMdd")}
        >
          back
        </button>
        <button onClick={handleDateSelectionForwards}>forward</button>
      </div>
      <div>{dayContainer}</div>
    </div>
  );
}
