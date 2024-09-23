import Calendar from "./Calendar";
import CreateBtn from "../../buttons/BtnCreate";
import styles from "../../../styles/CalendarMainPage.module.css";
import DialogHeader from "../../dialogs/DialogHeader";
import { useRef, useState } from "react";

function CalendarMainPage() {
  const dialogRef = useRef(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
