import { useEffect, useRef, useState } from "react";
import RoomTypeForm from "../../forms/RoomTypeForm.jsx";
import styles from "../../../styles/RoomTypes.module.css";
import DialogHeader from "../../dialogs/DialogHeader.jsx";
import fetchDataHelper from "../../../utils/fetchDataHelper.js";
import ErrorComponent from "../../error_page/ErrorComponent.jsx";

function RoomTypes() {
  const dialogRef = useRef(null);
  const editRef = useRef(null);

  const [roomTypeData, setRoomTypeData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function handleRoomTypeData() {
      try {
        const url = import.meta.env.VITE_URL_BASE + "room-types";
        const options = {
          mode: "cors",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        };

        const { data, errors } = await fetchDataHelper(url, options);

        if (data) {
          console.log(data);
          setRoomTypeData(data);
          return;
        }

        if (errors) {
          setError(errors);
        }
      } catch (err) {
        console.error(err);
        setError([{ msg: err.message || "Unexpected error occurred" }]);
      } finally {
        setLoading(false);
      }
    }

    handleRoomTypeData();
  }, []);

  function handleRoomSelection(id) {
    const data = roomTypeData.find(room => room._id === id);
    setRoomTypeData(data);
  }

  if (loading) return <div>Loading...</div>;

  if (error)
    return (
      <div>
        <ErrorComponent errors={error} />
      </div>
    );

  return (
    <div className={`${styles.mainContainer} main-content`}>
      <dialog ref={dialogRef} className="dialog">
        <DialogHeader title={"Create room type"} refProps={dialogRef} />
        <RoomTypeForm refProps={dialogRef} data={null} />
      </dialog>
      <dialog ref={editRef} className="dialog">
        <DialogHeader title={"Edit room Type"} refProps={editRef} />
        <RoomTypeForm refProps={editRef} data={roomTypeData} />
      </dialog>
      <button
        className={styles.createRoomTypeBtn}
        type="button"
        onClick={() => dialogRef.current?.showModal()}
      >
        Create Room Type
      </button>
      <div className={styles.roomTypesContainer}>
        {roomTypeData.map(roomType => (
          <div key={roomType._id} className={styles.roomsContainer}>
            <h3>{roomType.description}</h3>
            <dl className={styles.dlList}>
              <dt>type</dt>
              <dd>{roomType.type}</dd>
              <dt>gender</dt>
              <dd>{roomType.gender}</dd>
              <dt>Max occupancy</dt>
              <dd>{roomType.max_occupancy}</dd>
              <dt>Inventory</dt>
              <dd>{roomType.inventory}</dd>
              <dt>Base rate</dt>
              <dd>{`$ ${roomType.base_rate}`}</dd>
              <dt>Currency</dt>
              <dd>{roomType.currency}</dd>
            </dl>
            <a
              role="button"
              tabIndex={0}
              aria-label="Edit room type"
              onClick={() => {
                handleRoomSelection(roomType._id);
                editRef.current?.showModal();
              }}
            >
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoomTypes;
