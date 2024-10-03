import { Link } from "react-router-dom";
import styles from "../../../styles/ReservationDetails.module.css";
import ReservationInfo from "./ReservationInfo";
import ReservationControlPanel from "./ReservationControlPanel";
import GuestInfo from "../guest/GuestInfo";
import GuestControlPanel from "../guest/GuestControlPanel";
import { useState, useEffect } from "react";
export default function ReservationDetails() {
  const [toggleDisplay, setToggleDisplay] = useState(1);
  const [guestId, setGuestId] = useState(null);

  /* console.log(reservationsData); */

  const [guestData, setGuestData] = useState(null);
  /* console.log(guestData); */

  useEffect(() => {
    if (guestId === null) {
      return;
    }

    function fetchGuestData(id) {
      const url = import.meta.env.VITE_URL_BASE + "guests/" + id;
      const options = {
        mode: "cors",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      };

      fetch(url, options)
        .then(response => response.json())
        .then(data => setGuestData(data.msg))
        .catch(err => console.error(err));
    }

    fetchGuestData(guestId);
  }, [guestId]);

  if (!guestData) return <div>Error. Go back</div>;

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
          {toggleDisplay === 2 && <GuestInfo guestData={guestData} />}
        </div>
        <div className={styles.controlPanelContainer}>
          {toggleDisplay === 1 ? (
            <ReservationControlPanel />
          ) : (
            <GuestControlPanel guestData={guestData} />
          )}
        </div>
      </div>
    </>
  );
}
