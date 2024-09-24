import Calendar from "./Calendar";
import CreateBtn from "../../buttons/BtnCreate";
import styles from "../../../styles/CalendarMainPage.module.css";
import DialogHeader from "../../dialogs/DialogHeader";
import GuestEmailSearch from "../../forms/GuestEmailSearch";
import GuestForm from "../../forms/GuestForm";
import ReservationForm from "../../forms/ReservationForm";
import { useRef, useState } from "react";

function CalendarMainPage() {
  const dialogRef = useRef(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [guestData, setGuestData] = useState(null);
  const [email, setEmail] = useState(null);
  const [guestId, setGuestId] = useState(null);
  const [index, setIndex] = useState(0);

  return (
    <div className={styles.mainContent}>
      <dialog ref={dialogRef} className="dialog">
        {isDialogOpen && (
          <>
            <DialogHeader
              title={"Add new reservation"}
              refProps={dialogRef}
              setIsDialogOpen={setIsDialogOpen}
            />
            {index === 0 && (
              <GuestEmailSearch
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
            {index === 2 && <ReservationForm guestId={guestId} />}
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
