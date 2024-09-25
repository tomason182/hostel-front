import Calendar from "./Calendar";
import CreateBtn from "../../buttons/BtnCreate";
import styles from "../../../styles/CalendarMainPage.module.css";
import DialogHeader from "../../dialogs/DialogHeader";
import GuestEmailSearch from "../../forms/GuestEmailSearch";
import GuestForm from "../../forms/GuestForm";
import ReservationForm from "../../forms/ReservationForm";
import { useRef, useState, useContext } from "react";
import { RoomTypeContext } from "../../../data_providers/RoomTypesDataProvider";

function CalendarMainPage() {
  const dialogRef = useRef(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [guestData, setGuestData] = useState(null);
  const [email, setEmail] = useState(null);
  const [guestId, setGuestId] = useState(null);
  const [index, setIndex] = useState(0);

  const { roomTypeData } = useContext(RoomTypeContext);
  /* console.log(roomTypeData); */

  return (
    <div className={styles.mainContent}>
      <dialog ref={dialogRef} className="dialog">
        {isDialogOpen && (
          <>
            <DialogHeader
              title={"Add new reservation"}
              refProps={dialogRef}
              setIsDialogOpen={setIsDialogOpen}
              setIndex={setIndex}
            />
            {index === 0 && (
              <GuestEmailSearch
                refProps={dialogRef}
                setIndex={setIndex}
                setGuestData={setGuestData}
                setEmail={setEmail}
                setGuestId={setGuestId}
              />
            )}
            {index === 1 && (
              <GuestForm
                setIndex={setIndex}
                guestData={guestData}
                email={email}
                guestId={guestId}
                setGuestId={setGuestId}
              />
            )}
            {index === 2 && roomTypeData && (
              <ReservationForm
                guestId={guestId}
                roomTypeData={roomTypeData}
                setIndex={setIndex}
              />
            )}
          </>
        )}
      </dialog>
      <CreateBtn
        title={"New reservation"}
        refProps={dialogRef}
        setIsDialogOpen={setIsDialogOpen}
      />
      <Calendar />
    </div>
  );
}

export default CalendarMainPage;
