import styles from "../../../styles/Reservations.module.css";
import { Link } from "react-router-dom";
import ContentTitle from "../../headers/ContentTitle";
import { useContext } from "react";
import { format } from "date-fns";
import { ReservationContext } from "../../../data_providers/ReservationsDataProvider";

function Reservations() {
  const { reservationsData, setFromDate, setToDate, setFullName } =
    useContext(ReservationContext);

  /*   console.log(reservationsData); */

  const fetchReservationData = e => {
    e.preventDefault();

    setFromDate(e.target.fromDate.value);
    setToDate(e.target.toDate.value);
    setFullName(e.target.search?.value ? e.target.search.value : "all");
  };

  const listItems =
    reservationsData &&
    reservationsData.map(reservation => (
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
