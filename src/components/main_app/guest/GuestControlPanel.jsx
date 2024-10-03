import styles from "../../../styles/ReservationControlPanel.module.css";
import GuestFormUpdate from "../../forms/GuestFormUpdate";
import { useRef, useState } from "react";
import PropTypes from "prop-types";

export default function GuestControlPanel({ guestData, setToggleDisplay }) {
  const dialogRef = useRef();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <>
      <dialog ref={dialogRef} className="dialog">
        {isDialogOpen && (
          <GuestFormUpdate
            guestData={guestData}
            propRef={dialogRef}
            setIsDialogOpen={setIsDialogOpen}
          />
        )}
      </dialog>
      <div className={styles.controlPanel}>
        <button
          className={styles.btnLarge}
          onClick={() => {
            setIsDialogOpen(true);
            dialogRef?.current.showModal();
          }}
        >
          Update Guest Information
        </button>
        <button className={styles.btnLarge} onClick={() => setToggleDisplay(1)}>
          Go back to reservations
        </button>
      </div>
    </>
  );
}

GuestControlPanel.propTypes = {
  guestData: PropTypes.object.isRequired,
  setToggleDisplay: PropTypes.func.isRequired,
};
