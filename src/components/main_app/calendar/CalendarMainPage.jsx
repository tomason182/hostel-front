import { format, sub, add } from "date-fns";
import Calendar from "./Calendar";
import CreateBtn from "../../buttons/BtnCreate";
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

  const fetchReservationData = useCallback(() => {
    const fromDate = format(sub(startDate, { days: 3 }), "yyyyMMdd");
    const toDate = format(add(startDate, { days: 11 }), "yyyyMMdd");

    const url =
      import.meta.env.VITE_URL_BASE +
      "reservations/find/" +
      fromDate +
      "-" +
      toDate;
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
  console.log(guestData);

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
            {index === 1 && (
              <GuestForm
                setIndex={setIndex}
                guestData={guestData}
                setGuestData={setGuestData}
              />
            )}
            {index === 2 && roomTypeData && (
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
      <CreateBtn
        title={"New reservation"}
        refProps={dialogRef}
        setIsDialogOpen={setIsDialogOpen}
      />
      {roomTypeData && (
        <Calendar
          roomTypes={roomTypeData}
          reservations={reservations}
          startDate={startDate}
          setStartDate={setStartDate}
        />
      )}
    </div>
  );
}

export default CalendarMainPage;
