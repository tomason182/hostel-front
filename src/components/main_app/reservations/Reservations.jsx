import styles from "../../../styles/Reservations.module.css";
import { Link } from "react-router-dom";
import ContentTitle from "../../headers/ContentTitle";
import { useState } from "react";
import { format } from "date-fns";
import formatDateHelper from "../../../utils/formatDatesHelper";

function Reservations() {
  const [reservationsList, setReservationsList] = useState(null);

  const fetchReservationData = e => {
    e.preventDefault();

    const fromDate = e.target.fromDate.value;
    const toDate = e.target.toDate.value;
    const fullName = e.target.search?.value ? e.target.search.value : "all";

    const formattedFormDate = format(fromDate, "yyyyMMdd");
    const formattedToDate = format(toDate, "yyyyMMdd");

    const url =
      import.meta.env.VITE_URL_BASE +
      "reservations/find/" +
      formattedFormDate +
      "-" +
      formattedToDate +
      "-" +
      fullName;

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
        setReservationsList(data);
      })
      .catch(err =>
        console.error("Error fetching reservations data", err.message)
      );
  };

  const listItems =
    reservationsList &&
    reservationsList.map(reservation => {
      const price = Number.parseFloat(reservation.total_price).toFixed(2);
      const formattedCheckIn = formatDateHelper(reservation.check_in);
      const formattedCheckOut = formatDateHelper(reservation.check_out);

      return (
        <li key={reservation._id}>
          <Link to={reservation._id}>
            {reservation._id.substring(18).toUpperCase()}
          </Link>
          <p>{reservation.guest_info.full_name}</p>
          <p className={styles.dates}>
            {format(formattedCheckIn, "yyyy-MM-dd")}
          </p>
          <p className={styles.dates}>
            {format(formattedCheckOut, "yyyy-MM-dd")}
          </p>
          <p className={styles.prices}>$&nbsp;{price}</p>
        </li>
      );
    });

  return (
    <div className={styles.mainContent}>
      <ContentTitle title={"Reservations"} />
      <form className={styles.form} onSubmit={fetchReservationData}>
        <label>
          From
          <input type="date" name="fromDate" required aria-required />
        </label>
        <label>
          Until
          <input type="date" name="toDate" required aria-required />
        </label>
        <label>
          Search
          <input type="text" name="search" />
        </label>
        <button type="submit">Search</button>
      </form>

      <ul className={styles.reservationsList}>
        {listItems?.length === 0 ? (
          <li>No reservations found for the selected dates or guest name</li>
        ) : (
          listItems
        )}
      </ul>
    </div>
  );
}

export default Reservations;
