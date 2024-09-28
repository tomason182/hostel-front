import styles from "../../../styles/Reservations.module.css";
import { Link } from "react-router-dom";
import ContentTitle from "../../headers/ContentTitle";
import { useState } from "react";
import { format } from "date-fns";

function Reservations() {
  const [reservations, setReservations] = useState(null);

  function findGuest(text, data) {
    const names = text.toLowerCase().split(" ");
    return data.filter(d => {
      const fullName = d.guest_info.full_name;
      const splitFullName = fullName.toLowerCase().split(" ");

      return names.every(name => splitFullName.includes(name));
    });
  }

  console.log(reservations);
  async function fetchReservationData(e) {
    e.preventDefault();

    const fromDate = e.target.fromDate.value;
    const toDate = e.target.untilDate.value;
    const fullName = e.target.search.value;

    console.log(fullName);

    const formattedFormDate = format(fromDate, "yyyyMMdd");
    const formattedToDate = format(toDate, "yyyyMMdd");

    const url =
      import.meta.env.VITE_URL_BASE +
      "reservations/find/" +
      formattedFormDate +
      "-" +
      formattedToDate;

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
        if (fullName) {
          const result = findGuest(fullName, data);
          setReservations(result);
        } else {
          setReservations(data);
        }
      })
      .catch(err =>
        console.error("Error fetching reservations data", err.message)
      );
  }

  const listItems =
    reservations &&
    reservations.map(reservation => (
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
        <label htmlFor="from">From</label>
        <input type="date" id="from" name="fromDate" />
        <label htmlFor="until">Until</label>
        <input type="date" id="until" name="untilDate" />
        <label htmlFor="search">Search</label>
        <input type="text" id="search" name="search" />
        <button type="submit">Search</button>
      </form>

      <ul className={styles.reservationsList}>{listItems}</ul>
    </div>
  );
}

export default Reservations;
