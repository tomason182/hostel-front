import { format, sub, add } from "date-fns";
import Calendar from "./Calendar";
import CalendarPhone from "./CalendarPhone";
import CalendarFooter from "./CalendarFooter";
import CalendarFooterPhone from "./CalendarFooterPhone";
import styles from "../../../styles/CalendarMainPage.module.css";
import DialogHeader from "../../dialogs/DialogHeader";
import GuestEmailSearch from "../../forms/GuestEmailSearch";
import GuestForm from "../../forms/GuestForm";
import ReservationForm from "../../forms/ReservationForm";

import { useRef, useState, useContext, useCallback, useEffect } from "react";
import { RoomTypeContext } from "../../../data_providers/RoomTypesDataProvider";

function CalendarMainPage() {
  const dialogRef = useRef(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [guestData, setGuestData] = useState(null);
  const [index, setIndex] = useState(0);
  const today = new Date();
  const [startDate, setStartDate] = useState(today);
  const [reservations, setReservations] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 984);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 984);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  });

  useEffect(() => {
    function handleCalendarDialogCloseOnEscKey(e) {
      if (e.key === "Escape") {
        setIsDialogOpen(false);
        setIndex(0);
        return;
      }
    }
    if (isDialogOpen) {
      document.addEventListener("keydown", handleCalendarDialogCloseOnEscKey);
    } else {
      document.removeEventListener(
        "keydown",
        handleCalendarDialogCloseOnEscKey
      );
    }

    return () =>
      document.removeEventListener(
        "keydown",
        handleCalendarDialogCloseOnEscKey
      );
  }, [isDialogOpen]);

  const fetchReservationData = useCallback(() => {
    const fromDate = format(sub(startDate, { days: 3 }), "yyyyMMdd");
    const toDate = format(add(startDate, { days: 11 }), "yyyyMMdd");
    const fullName = "all";

    const url =
      import.meta.env.VITE_URL_BASE +
      "reservations/find/" +
      fromDate +
      "-" +
      toDate +
      "-" +
      fullName;
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
      .then(data => setReservations(data))
      .catch(err =>
        console.error("Error fetching reservations data", err.message)
      );
  }, [startDate]);

  useEffect(() => {
    fetchReservationData();
  }, [fetchReservationData]);

  // Porque se renderiza 5 veces guestData al comienzo?
  /* console.log(guestData); */

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
              />
            )}
            {index === 1 && guestData && (
              <GuestForm
                setIndex={setIndex}
                guestData={guestData}
                setGuestData={setGuestData}
              />
            )}
            {index === 2 && roomTypeData && guestData && (
              <ReservationForm
                guestData={guestData}
                roomTypeData={roomTypeData}
                setIndex={setIndex}
                propRef={dialogRef}
                setIsDialogOpen={setIsDialogOpen}
                fetchReservationData={fetchReservationData}
              />
            )}
          </>
        )}
      </dialog>
      {roomTypeData &&
        reservations &&
        (isMobile ? (
          <CalendarPhone
            roomTypes={roomTypeData}
            reservations={reservations}
            startDate={startDate}
            setStartDate={setStartDate}
          />
        ) : (
          <Calendar
            roomTypes={roomTypeData}
            reservations={reservations}
            startDate={startDate}
            setStartDate={setStartDate}
          />
        ))}
      {isMobile ? (
        <CalendarFooterPhone
          dialogRef={dialogRef}
          setIsDialogOpen={setIsDialogOpen}
        />
      ) : (
        <CalendarFooter
          dialogRef={dialogRef}
          setIsDialogOpen={setIsDialogOpen}
        />
      )}
    </div>
  );
}

export default CalendarMainPage;
