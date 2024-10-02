import { Link } from "react-router-dom";
import styles from "../../../styles/ReservationDetails.module.css";
import ReservationInfo from "./ReservationInfo";
import ReservationControlPanel from "./ReservationControlPanel";
import GuestInfo from "../guest/GuestInfo";
import { useState } from "react";
export default function ReservationDetails() {
  const [toggleDisplay, setToggleDisplay] = useState(1);
  const [guestId, setGuestId] = useState(null);
  console.log(guestId);

  /* console.log(reservationsData); */

  return (
    <>
      <Link className={styles.goBackLink} to="/app/reservations">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H6M12 5l-7 7 7 7" />
        </svg>
        <span>back</span>
      </Link>
      <div className={styles.mainContainer}>
        <div className={styles.infoContainer}>
          {toggleDisplay === 1 && (
            <ReservationInfo
              setToggleDisplay={setToggleDisplay}
              setGuestId={setGuestId}
            />
          )}
          {toggleDisplay === 2 && (
            <GuestInfo setToggleDisplay={setToggleDisplay} guestId={guestId} />
          )}
        </div>
        <div className={styles.controlPanelContainer}>
          {toggleDisplay === 1 ? (
            <ReservationControlPanel />
          ) : (
            <div>Control panenl</div>
          )}
        </div>
      </div>
    </>
  );
}
