import styles from "../../../styles/Home.module.css";
import { format, sub } from "date-fns";
import ContentTitle from "../../headers/ContentTitle";
import HomeContainers from "./HomeContainers";
import { useState, useEffect } from "react";
import formatDateHelper from "../../../utils/formatDatesHelper";
function Home() {
  const [reservations, setReservations] = useState(null);
  const [last10Reservations, setlast10Reservations] = useState(null);
  const [loadingReservations, setLoadingReservations] = useState(false);
  const [reservationsError, setReservationsError] = useState(null); 
  const [last10ReservationsError, setlast10ReservationsError] = useState(null);

  useEffect(() => {
    function fetchTodaysReservations(from, to, fullName) {
      setLoadingReservations(true);
      const fromDate = format(from, "yyyyMMdd");
      const toDate = format(to, "yyyyMMdd");

      const url =
        import.meta.env.VITE_URL_BASE +
        "reservations/find/" +
        fromDate +
        "-" +
        toDate +
        "-" +
        fullName;
      const url2 = import.meta.env.VITE_URL_BASE + "reservations/last-10-reservations";
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
        .then(data => {
          const formattedData = data.map(d => ({
            ...d,
            check_in: formatDateHelper(d.check_in),
            check_out: formatDateHelper(d.check_out),
          }));
          return formattedData;
        })
        .then(formattedData => setReservations(formattedData))
        .catch(err => {
          console.error(err);
          setReservationsError("Error Fetching today's reservations");
        })
      
      fetch(url2, options)
        .then(response => response.json())
        .then(data => {
          const formattedData = data.map(d => ({
            ...d,
            check_in: formatDateHelper(d.check_in),
            check_out: formatDateHelper(d.check_out),
          }));
          return formattedData;
        })
        .then(formattedData => setlast10Reservations(formattedData))
        .catch(err => {
          console.error(err);
          setlast10ReservationsError("Error retrieving last 10 reservations");
        })
        .finally(setLoadingReservations(false));

    }

    const today = new Date();
    const before = sub(today, { days: 30 });
    const fullName = "all";
    fetchTodaysReservations(before, today, fullName);
  }, []);

  let today = new Date();
  let lower_limit = sub(today, { days: 30 });
  lower_limit = format(lower_limit, "yyyyMMdd");
  today = format(today, "yyyyMMdd");
  

  const coming =
    reservations &&
    reservations.filter(r => {
      const checkIn = format(r.check_in, "yyyyMMdd");

      return (
        checkIn === today &&
        (r.reservation_status === "confirmed" ||
          r.reservation_status === "provisional")
      );
    });

  const leaving =
    reservations &&
    reservations.filter(r => {
      const checkOut = format(r.check_out, "yyyyMMdd");

      return (
        checkOut === today &&
        (r.reservation_status === "confirmed" ||
          r.reservation_status === "provisional")
      );
    });

  const latestReservation = last10Reservations && last10Reservations
    .filter(r => (format(r.updated_At, "yyyyMMdd") > lower_limit) && (r.reservation_status === "confirmed" || r.reservation_status === "provisional"));
  

  // Titles
  const messageOne = {
    title: "Who's coming today?",
    msg: "You have no arrivals today",
  };
  const messageTwo = {
    title: "Who's leaving today?",
    msg: "You have no departures today",
  };
  const messageThree = {
    title: "Latest reservations",
    msg: "No reservations in the last 30 days",
  };
  /*   const messageFour = {
    title: "What's new?",
    msg: "Nothing yet",
  }; */
  return (
    <div className="main-content">
      <ContentTitle title={"Home"} />
      <div className={styles.containers}>
        {reservations && (
          <HomeContainers
            message={messageOne}
            data={coming}
            loading={loadingReservations}
            error={reservationsError}
          />
        )}
        {reservations && (
          <HomeContainers
            message={messageTwo}
            data={leaving}
            loading={loadingReservations}
            error={reservationsError}
          />
        )}
        {last10Reservations && (
          <HomeContainers
            message={messageThree}
            data={latestReservation}
            loading={loadingReservations}
            error={last10ReservationsError}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
