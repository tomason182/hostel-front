import { format, sub, add } from "date-fns";
import styles from "../../../styles/CalendarPhone.module.css";
import { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
export default function Calendar({
  roomTypes,
  reservations,
  startDate,
  setStartDate,
}) {
  const [dynamicReservationList, setDynamicReservationsList] = useState([]);

  useEffect(() => {
    function checkBedsAssignment(reservationsList) {
      const today = format(new Date(), "yyyyMMdd");
      const reservationsInTheHouse = reservationsList.filter(
        r =>
          format(new Date(r.check_in), "yyyyMMdd") <= today &&
          format(new Date(r.check_out), "yyyyMMdd") > today
      );

      const reservationsWithNoBedsAssigned = reservationsInTheHouse.filter(
        r => r.assigned_beds.length === 0
      );

      if (reservationsWithNoBedsAssigned.length > 0) {
        const url =
          import.meta.env.VITE_URL_BASE + "reservations/check-in/assign-beds";
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
          .then(data => console.log(data))
          .catch(err => console.error(err));
      }
    }

    checkBedsAssignment(reservations);
  }, [reservations]);

  useEffect(() => {
    setDynamicReservationsList([]);
    // Primer paso. Obtener las reservas que tiene camas asigandas
    const reservationsWithBeds = reservations.filter(
      r => r.assigned_beds.length !== 0
    );

    // Segundo paso. Asignar las reservas con camas a useState.
    setDynamicReservationsList(prevList => [
      ...prevList,
      ...reservationsWithBeds,
    ]);

    // Tercer paso. Filtrar las reservas que no tiene cama
    const reservationsWithNoBeds = reservations.filter(
      r => r.assigned_beds.length === 0
    );

    // Cuarto paso. Ordenar las reservas por orden de llegada
    const reservationsWithNoBedsSorted = reservationsWithNoBeds.sort((a, b) => {
      return new Date(a.check_in) - new Date(b.check_in);
    });

    let reservationsWithBedsTemp = [...reservationsWithBeds];

    // Quinto paso. Iterar sobre las reservas ordenadas
    for (const reservation of reservationsWithNoBedsSorted) {
      // Sexto paso. Buscar reservas con camas para el mismo tipo de cuarto en useState y que se solapen.
      const checkIn = format(reservation.check_in, "yyyyMMdd");
      const checkOut = format(reservation.check_out, "yyyyMMdd");
      const reservationByRoomType = reservationsWithBedsTemp.filter(
        r => r.room_type_id === reservation.room_type_id
      );

      const reservationsFilteredByDate = reservationByRoomType.filter(
        r =>
          format(r.check_in, "yyyyMMdd") < checkOut &&
          format(r.check_out, "yyyyMMdd") > checkIn
      );

      // Septimo. Obtener las camas disponibles.
      const roomType = roomTypes.find(
        rt => rt._id === reservation.room_type_id
      );
      const totalBeds = roomType.products.flatMap(product => product.beds);
      const occupiedBeds = reservationsFilteredByDate.flatMap(
        r => r.assigned_beds
      );
      const availableBeds = totalBeds.filter(
        bed => !occupiedBeds.includes(bed)
      );

      // Copiar la reserva para evitar mutaciones
      const updatedReservation = { ...reservation, assigned_beds: [] };

      // Octavo. Asignamos camas segun tipo de cuarto
      if (roomType.type === "dorm") {
        if (availableBeds.length >= updatedReservation.number_of_guest) {
          updatedReservation.assigned_beds = availableBeds.slice(
            0,
            updatedReservation.number_of_guest
          );
        }
      } else {
        if (availableBeds.length > 0) {
          updatedReservation.assigned_beds = availableBeds.slice(0, 1);
        }
      }

      reservationsWithBedsTemp.push(updatedReservation);
    }

    setDynamicReservationsList(prevList => [
      ...prevList,
      ...reservationsWithBedsTemp,
    ]);
  }, [roomTypes, reservations]);

  const today = new Date();
  // Formatting year and month
  const year = format(startDate, "yyyy");
  const MMM = format(startDate, "MMMM");

  const handleNextBtn = () => setStartDate(add(startDate, { days: 5 })); // Aca hay que cambiar

  const handlePrevBtn = () => setStartDate(sub(startDate, { days: 5 })); // Aca hay que cambiar

  // Generate weeks array

  const firstDayOfCalendar = sub(startDate, { days: 1 }); // Aca hay que cambiar
  const weeksArray = Array.from(
    { length: 5 },
    (
      _,
      i // Aca hay que cambiar
    ) => add(firstDayOfCalendar, { days: i })
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

  if (!reservations || !roomTypes || !dynamicReservationList)
    return <p>Loading...</p>;

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

  // assigning beds

  const getReservationDetails = (day, bedId, type = "find") => {
    const currentDate = format(day, "yyyy-MM-dd");

    const reservation = dynamicReservationList.find(
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
        <th colSpan={8} key={room._id}>
          {" "}
          {/* Aca hay que cambiar*/}
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
              <p className={styles.roomName}>
                {product.room_name}
                {room.type === "dorm" ? (
                  <span>Dorm</span>
                ) : (
                  <span>Private</span>
                )}
              </p>
            </th>
          </tr>
          {product.beds.map((bed, i) => {
            let skipDays = 0;
            return (
              <tr
                key={bed}
                className={
                  room.type === "dorm" ? styles.rows : styles.rowsPrivate
                }
              >
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
            <th colSpan={6}>
              {" "}
              {/* Aca hay que cambiar*/}
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
        <tbody>
          {listOfRooms.length === 0 ? (
            <tr height={250}>
              <td colSpan={10} className={styles.noRoomTypesMessage}>
                {" "}
                {/* Aca hay que cambiar*/}
                There are no room types created. Before you begin, please{" "}
                <Link
                  to="/app/property/room-types"
                  className={styles.createRoomLink}
                >
                  create your property room types
                </Link>
              </td>
            </tr>
          ) : (
            listOfRooms
          )}
        </tbody>
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
