import styles from "../../../styles/ReservationControlPanel.module.css";
import GuestFormUpdate from "../../forms/GuestFormUpdate";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import PropTypes from "prop-types";

export default function GuestControlPanel({
  guestData,
  setToggleDisplay,
  refreshData,
}) {
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
            refreshData={refreshData}
          />
        )}
      </dialog>
      <div className={styles.controlPanel}>
        <p>Update this guest</p>
        <button
          className={styles.btnLarge}
          onClick={() => {
            setIsDialogOpen(true);
            dialogRef?.current.showModal();
          }}
        >
          Update Guest Information
        </button>
        <button className={styles.btnDeleteGuest}>Delete Guest</button>
        <Link
          className={styles.goBackLink}
          to="#"
          role="button"
          onClick={() => setToggleDisplay(1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="19 20 9 12 19 4 19 20"></polygon>
            <line x1="5" y1="19" x2="5" y2="5"></line>
          </svg>
          Back
        </Link>
      </div>
    </>
  );
}

GuestControlPanel.propTypes = {
  guestData: PropTypes.object.isRequired,
  setToggleDisplay: PropTypes.func.isRequired,
  refreshData: PropTypes.func.isRequired,
};
