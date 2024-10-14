import styles from "../../../styles/ReservationDetails.module.css";
import ReservationInfo from "./ReservationInfo";
import ReservationControlPanel from "./ReservationControlPanel";
import GuestInfo from "../guest/GuestInfo";
import GuestControlPanel from "../guest/GuestControlPanel";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ReservationContext } from "../../../data_providers/ReservationsDataProvider";

export default function ReservationDetails() {
  const { id } = useParams();
  const [toggleDisplay, setToggleDisplay] = useState(1);
  const [guestData, setGuestData] = useState(null);
  const [guestId, setGuestId] = useState(null);
  const [reservationId, setReservationId] = useState(null);

  useEffect(() => {
    if (guestId === null) {
      return;
    }

    function fetchGuestData(id) {
      const url = import.meta.env.VITE_URL_BASE + "guests/find-by-id/" + id;
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

  const { reservationsData } = useContext(ReservationContext);

  const reservationData =
    reservationsData &&
    reservationsData.find(reservation => reservation._id === id);

  useEffect(() => {
    if (reservationData) {
      const guestId = reservationData.guest_id;
      const reservationId = reservationData._id;
      setGuestId(guestId);
      setReservationId(reservationId);
    }
  }, [reservationData, setGuestId, setReservationId]);

  if (!reservationsData) {
    return <div>Should redirect to reservation</div>;
  }

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.infoContainer}>
          {toggleDisplay === 1 && (
            <ReservationInfo
              setToggleDisplay={setToggleDisplay}
              reservationData={reservationData}
            />
          )}
          {toggleDisplay === 2 && <GuestInfo guestData={guestData} />}
        </div>
        <div className={styles.controlPanelContainer}>
          {toggleDisplay === 1 ? (
            <ReservationControlPanel
              reservationId={reservationId}
              reservationData={reservationData}
            />
          ) : (
            <GuestControlPanel
              guestData={guestData}
              setToggleDisplay={setToggleDisplay}
            />
          )}
        </div>
      </div>
    </>
  );
}
