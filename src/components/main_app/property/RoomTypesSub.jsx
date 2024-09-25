import PropTypes from "prop-types";
import styles from "../../../styles/RoomTypesSub.module.css";

export default function RoomTypesSub({ roomTypeData }) {
  if (!roomTypeData) return <p>Loading...</p>;

  const roomTypeList =
    roomTypeData.length === 0 ? (
      <li>No room type to display</li>
    ) : (
      roomTypeData.map(roomType => (
        <li key={roomType._id}>
          <p>{roomType.description}</p>
          <div className={styles.info}>
            <span>{roomType.type}</span>
            <span>{roomType.gender}</span>
            <span>{roomType.max_occupancy} max</span>
          </div>
        </li>
      ))
    );

  return <ul className={styles.roomTypesList}>{roomTypeList}</ul>;
}

RoomTypesSub.propTypes = {
  roomTypeData: PropTypes.array.isRequired,
};
