import styles from "../../../styles/Reservations.module.css";
import { Link } from "react-router-dom";
import ContentTitle from "../../headers/ContentTitle";
import { reservations } from "../../../data_mocked";

function Reservations() {
  const listItems = reservations.map(reservation => (
    <li key={reservation._id}>
      <Link to={reservation._id}>{reservation._id}</Link>
      <p>{reservation.guest_id}</p>
      <p className={styles.dates}>{reservation.check_in_date}</p>
      <p className={styles.dates}>{reservation.check_out_date}</p>
      <p className={styles.prices}>$&nbsp;{reservation.total_price}</p>
    </li>
  ));

  return (
    <>
      <ContentTitle title={"Reservations"} />
      <form className={styles.form}>
        <label htmlFor="from">From</label>
        <input type="date" id="from" name="from_date" />
        <label htmlFor="until">Until</label>
        <input type="date" id="until" name="until_date" />
        <label htmlFor="search">Search</label>
        <input type="text" id="search" name="search" />
        <button type="submit">Search</button>
      </form>

      <ul className={styles.reservationsList}>{listItems}</ul>
    </>
  );
}

export default Reservations;
