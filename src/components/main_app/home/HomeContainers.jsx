import PropTypes from "prop-types";
import styles from "../../../styles/HomeContainers.module.css";
import { format } from "date-fns";

export default function HomeContainers({ message, data, loading, error }) {
  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error.message}</div>;

  const listItems =
    data.length === 0 ? (
      <li>{message.msg}</li>
    ) : (
      data.map(d => (
        <li key={d._id}>
          <p>{d.data_guest.first_name} {d.data_guest.last_name}</p>
          <div className={styles.infoContainer}>
            <span>
              {format(d.check_in, "yyyy-MM-dd")}&nbsp;&nbsp;
              {format(d.check_out, "yyyy-MM-dd")}
            </span>
            <span className={styles.guests}>{d.number_of_guest} pers</span>
          </div>
        </li>
      ))
    );
  return (
    <div className={styles.content}>
      <h3>{message.title}</h3>
      <ul>{listItems}</ul>
    </div>
  );
}

HomeContainers.propTypes = {
  message: PropTypes.object.isRequired,
  data: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
};
