import { useContext, useRef, useState } from "react";
import styles from "../../../styles/RoomTypes.module.css";
import DialogHeader from "../../dialogs/DialogHeader.jsx";
import CreateBtn from "../../buttons/BtnCreate.jsx";
import fetchDataHelper from "../../../utils/fetchDataHelper.js";
import ErrorComponent from "../../error_page/ErrorComponent.jsx";
import RoomTypeFormUpdate from "../../forms/RoomTypeFormUpdate.jsx";
import RoomTypesFormCreate from "../../forms/RoomTypeFormCreate.jsx";
import ConfirmationDialog from "../../dialogs/ConfirmationDialog.jsx";
import { RoomTypeContext } from "../../../data_providers/RoomTypesDataProvider.jsx";

function RoomTypes() {
  const dialogRef = useRef(null);
  const editRef = useRef(null);
  const confirmRef = useRef(null);

  const { roomTypeData, refreshRoomTypeData } = useContext(RoomTypeContext);

  const [selectedRoomType, setSelectedRoomType] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isRoomTypeUpdated, setIsRoomTypeUpdated] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  function handleRoomSelection(id) {
    const data = roomTypeData.find(room => room._id === id);
    setSelectedRoomType(data);
  }

  async function handleRoomTypeDelete(id) {
    setDeleteLoading(true);
    try {
      const url = import.meta.env.VITE_URL_BASE + "room-types/delete/" + id;
      const options = {
        mode: "cors",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      };

      const { data, errors } = await fetchDataHelper(url, options);

      if (data) {
        console.log(data);
        setIsRoomTypeUpdated(!isRoomTypeUpdated);
      }

      if (errors) {
        console.error(errors);
        setDeleteError(errors);
      }
    } catch (err) {
      setDeleteError({ msg: err.message || "Unexpected error occurred" });
    } finally {
      setDeleteLoading(false);
      refreshRoomTypeData();
    }
  }

  if (!roomTypeData) return <div>Loading...</div>;

  return (
    <div className={`${styles.mainContainer} main-content`}>
      <ConfirmationDialog
        title="Delete Room Type?"
        description="This action can not been undone. Make sure there are no reservations for this room type"
        refProps={confirmRef}
        handleActionFunction={() => handleRoomTypeDelete(selectedRoomType?._id)}
      />

      <dialog ref={dialogRef} className="dialog">
        {isDialogOpen && (
          <>
            <DialogHeader
              title={"Create room type"}
              refProps={dialogRef}
              setIsDialogOpen={setIsDialogOpen}
            />
            <RoomTypesFormCreate
              refProps={dialogRef}
              setIsDialogOpen={setIsDialogOpen}
              refreshRoomTypeData={refreshRoomTypeData}
            />
          </>
        )}
      </dialog>
      <dialog ref={editRef} className="dialog">
        {isDialogOpen && selectedRoomType && (
          <>
            <DialogHeader
              title={"Edit room Type"}
              refProps={editRef}
              setIsDialogOpen={setIsDialogOpen}
            />
            <RoomTypeFormUpdate
              refProps={editRef}
              data={selectedRoomType}
              refreshRoomTypeData={refreshRoomTypeData}
              setIsDialogOpen={setIsDialogOpen}
            />
          </>
        )}
      </dialog>
      <CreateBtn
        title={"Create Room Type"}
        setIsDialogOpen={setIsDialogOpen}
        refProps={dialogRef}
      />
      <div className={styles.roomTypesContainer}>
        {roomTypeData.length === 0 ? (
          <h1>No room types found. Please Create a room type</h1>
        ) : (
          roomTypeData.map(roomType => (
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
              <menu className={styles.btnMenu}>
                <button
                  type="button"
                  aria-label="delete room type"
                  disabled={deleteLoading}
                  onClick={() => {
                    handleRoomSelection(roomType._id);
                    confirmRef?.current.showModal();
                  }}
                >
                  Delete
                </button>
                <a
                  role="button"
                  tabIndex={0}
                  aria-label="Edit room type"
                  onClick={() => {
                    setIsDialogOpen(true);
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
              </menu>
              {deleteError && <ErrorComponent errors={deleteError} />}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default RoomTypes;
