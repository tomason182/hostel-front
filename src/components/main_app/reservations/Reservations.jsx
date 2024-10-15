import styles from "../../../styles/Reservations.module.css";
import { Link } from "react-router-dom";
import ContentTitle from "../../headers/ContentTitle";
import { useState } from "react";
import { format } from "date-fns";

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
    reservationsList.map(reservation => (
      <li key={reservation._id}>
        <Link to={reservation._id}>
          {reservation._id.substring(18).toUpperCase()}
        </Link>
        <p>{reservation.guest_info.full_name}</p>
        <p className={styles.dates}>
          {format(reservation.check_in, "yyyy-MM-dd")}
        </p>
        <p className={styles.dates}>
          {format(reservation.check_out, "yyyy-MM-dd")}
        </p>
        <p className={styles.prices}>$&nbsp;{reservation.total_price}</p>
      </li>
    ));

  return (
    <div className="main-content">
      <ContentTitle title={"Reservations"} />
      <form className={styles.form} onSubmit={fetchReservationData}>
        <label>
          From
          <input type="date" name="fromDate" />
        </label>
        <label>
          Until
          <input type="date" name="toDate" />
        </label>
        <label>
          Search
          <input type="text" name="search" />
        </label>
        <button type="submit">Search</button>
      </form>

      <ul className={styles.reservationsList}>{listItems}</ul>
    </div>
  );
}

export default Reservations;
