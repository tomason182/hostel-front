import { roomTypes } from "../../../data_mocked.js";
import { useRef } from "react";
import RoomTypeForm from "../../forms/RoomTypeForm.jsx";
import styles from "../../../styles/RoomTypes.module.css";

function RoomTypes() {
  const dialogRef = useRef(null);

  const tableRows = roomTypes.map(roomType => (
    <tr key={roomType._id}>
      <th scope="row">{roomType.description}</th>
      <td>{roomType.type}</td>
      <td>{roomType.gender}</td>
      <td>{roomType.bathroom}</td>
      <td>{roomType.max_occupancy}</td>
      <td>{roomType.inventory}</td>
      <td>{`$ ${roomType.base_rate}`}</td>
      <td>{roomType.currency}</td>
      <td>
        <a role="button" tabIndex={0} aria-label="Edit room type">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            role="img"
            className={styles.editBtn}
          >
            <polygon points="14 2 18 6 7 17 3 17 3 13 14 2"></polygon>
            <line x1="3" y1="22" x2="21" y2="22"></line>
          </svg>
        </a>
      </td>
    </tr>
  ));
  return (
    <div className={styles.roomTypeContainer}>
      <dialog ref={dialogRef} id={styles.dialog}>
        <div className={styles.dialogHeader}>
          <h3>Create a new Room type</h3>
          <button type="button">
            <svg
              xmlns="http://w3.org/2000/svg"
              aria-label="Dialog close button"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              className={styles.dialogCloseIcon}
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <RoomTypeForm refProps={dialogRef} />
      </dialog>
      <button
        className={styles.createRoomTypeBtn}
        type="button"
        onClick={() => dialogRef.current?.showModal()}
      >
        Create Room Type
      </button>
      <table id={styles.table}>
        <caption>Room types</caption>
        <thead>
          <tr>
            <th scope="col">Description</th>
            <th scope="col">Type</th>
            <th scope="col">gender</th>
            <th scope="col">bathroom</th>
            <th scope="col">Max occupancy</th>
            <th scope="col">Inventory</th>
            <th scope="col">Base rate</th>
            <th scope="col">Currency</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
}

export default RoomTypes;
