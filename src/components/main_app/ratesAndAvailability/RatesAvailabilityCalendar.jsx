import { format, add, sub } from "date-fns";
import styles from "../../../styles/RatesAvailabilityCalendar.module.css";
import { RoomTypeContext } from "../../../data_providers/RoomTypesDataProvider";
import { useState, useContext, useEffect, useRef } from "react";
import RatesAndAvailabilityForm from "../../forms/RatesAndAvailabilityForm";
import DialogHeader from "../../dialogs/DialogHeader";
import PermissionsDialog from "../../dialogs/PermissionsDialog";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import formatDateHelper from "../../../utils/formatDatesHelper";

export default function RatesAvailabilityCalendar({ role }) {
  const today = new Date();
  const [startDate, setStartDate] = useState(today);
  const [reservationsData, setReservationsData] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const dialogRef = useRef(null);
  const permissionsRef = useRef(null);

  const { roomTypeData, refreshRoomTypeData } = useContext(RoomTypeContext);

  useEffect(() => {
    function handleBulkEditDialogCloseOnEsc(e) {
      if (e.key === "Escape") {
        setIsDialogOpen(false);
      }
    }

    if (isDialogOpen) {
      document.addEventListener("keydown", handleBulkEditDialogCloseOnEsc);
    } else {
      document.removeEventListener("keydown", handleBulkEditDialogCloseOnEsc);
    }

    return () =>
      document.removeEventListener("keydown", handleBulkEditDialogCloseOnEsc);
  }, [isDialogOpen]);

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
        .then(data => {
          const formattedData = data.map(d => ({
            ...d,
            check_in: formatDateHelper(d.check_in),
            check_out: formatDateHelper(d.check_out),
          }));
          return formattedData;
        })
        .then(formattedData => setReservationsData(formattedData))
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
    let bookingsCount = [];
    console.log(reservations);
    if (reservations && reservations.length !== undefined) {
      bookingsCount = reservations.filter(
        r =>
          new Date(r.updated_At).getTime() >
          new Date(ratesAndAvailabilityObj.created_At).getTime()
      );
    }

    return ratesAndAvailabilityObj.custom_availability - bookingsCount.length;
  }

  // Find amount of bookings for certain date
  function handleBookingsCount(reservations, typeOfRoom) {
    let bookingsCount = 0;
    if (typeOfRoom === "dorm") {
      bookingsCount = reservations
        .map(r => r.number_of_guest)
        .reduce((acc, currentValue) => acc + currentValue);
    } else {
      bookingsCount = reservations.length;
    }

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
              const occupancy =
                room.type === "dorm"
                  ? room.max_occupancy * room.inventory
                  : room.inventory;
              const rate = ratesAndAvailability
                ? ratesAndAvailability.custom_rate
                : room.base_rate;
              const listOfReservations =
                reservationsData.length !== 0
                  ? ListOfBookingsForCurrentDate(day, room, reservationsData)
                  : 0;

              const bookingsCount =
                listOfReservations.length !== 0 &&
                listOfReservations.length !== undefined
                  ? handleBookingsCount(listOfReservations, room.type)
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
                      <dd
                        className={`${styles.status} ${
                          availability === 0 ? styles.close : styles.open
                        }`}
                      >
                        {availability === 0 ? "Close" : "Open"}
                      </dd>
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
      {permissionsRef && <PermissionsDialog refProps={permissionsRef} />}
      {roomTypeData === null || roomTypeData?.length === 0 ? (
        <div className={styles.noRoomTypesMessage}>
          There are no room types created. Before you begin, please{" "}
          <Link to="/app/property/room-types" className={styles.createRoomLink}>
            create your property room types
          </Link>
        </div>
      ) : (
        <>
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
          <div className={styles.editContainer}>
            <button
              onClick={() => {
                setIsDialogOpen(true);
                role === "employee"
                  ? permissionsRef?.current.showModal()
                  : dialogRef?.current.showModal();
              }}
            >
              Bulk Edit
            </button>
          </div>
          <div className={styles.dateSelectionContainer}>
            <button
              onClick={handleDateSelectionBackwards}
              disabled={
                format(today, "yyyyMMdd") === format(startDate, "yyyyMMdd")
              }
            >
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
            <button onClick={handleDateSelectionForwards}>
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
          </div>
          <div>{dayContainer}</div>
        </>
      )}
    </div>
  );
}

RatesAvailabilityCalendar.propTypes = {
  role: PropTypes.string.isRequired,
};
