import { roomTypes } from "../../../data_mocked";
import styles from "../../../styles/RoomTypesSub.module.css";

export default function RoomTypesSub() {
  const roomTypeList = roomTypes.map(roomType => (
    <li key={roomType._id}>
      <span>{roomType._id}</span>
      <p>{roomType.description}</p>
      <div className={styles.info}>
        <span>{roomType.type}</span>
        <span>{roomType.gender}</span>
        <span>{roomType.max_occupancy} max</span>
      </div>
    </li>
  ));

  return <ul className={styles.roomTypesList}>{roomTypeList}</ul>;
}
