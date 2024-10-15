import styles from "../../../styles/ReservationDetails.module.css";
import ReservationInfo from "./ReservationInfo";
import ReservationControlPanel from "./ReservationControlPanel";
import GuestInfo from "../guest/GuestInfo";
import GuestControlPanel from "../guest/GuestControlPanel";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

export default function ReservationDetails() {
  const { id } = useParams();
  const [toggleDisplay, setToggleDisplay] = useState(1);
  const [guestData, setGuestData] = useState(null);
  const [reservationData, setReservationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchReservationData = useCallback(async () => {
    try {
      const urlReservations =
        import.meta.env.VITE_URL_BASE + "reservations/find-by-id/" + id;
      const optionsReservations = {
        mode: "cors",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      };

      const reservationResponse = await fetch(
        urlReservations,
        optionsReservations
      );
      const reservationResult = await reservationResponse.json();
      setReservationData(reservationResult);

      const guestId = await reservationResult.guest_id;
      const urlGuest =
        import.meta.env.VITE_URL_BASE + "guests/find-by-id/" + guestId;
      const optionsGuest = {
        mode: "cors",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      };

      const guestResponse = await fetch(urlGuest, optionsGuest);
      const guestResult = await guestResponse.json();
      setGuestData(guestResult.msg);
    } catch (err) {
      setError([{ msg: err.message || "Unexpected error ocurred" }]);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchReservationData();
  }, [fetchReservationData]);

  if (error) return <div>Error fetching reservation data</div>;

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.infoContainer}>
          {toggleDisplay === 1 && (
            <ReservationInfo
              setToggleDisplay={setToggleDisplay}
              reservationData={reservationData}
              guestData={guestData}
            />
          )}
          {toggleDisplay === 2 && <GuestInfo guestData={guestData} />}
        </div>
        <div className={styles.controlPanelContainer}>
          {toggleDisplay === 1 ? (
            <ReservationControlPanel
              reservationId={id}
              reservationData={reservationData}
              refreshData={fetchReservationData}
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
