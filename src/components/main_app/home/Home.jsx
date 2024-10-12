import styles from "../../../styles/Home.module.css";
import { format, sub } from "date-fns";
import ContentTitle from "../../headers/ContentTitle";
import HomeContainers from "./HomeContainers";
import { useState, useEffect } from "react";
function Home() {
  const [reservations, setReservations] = useState(null);
  const [loadingReservations, setLoadingReservations] = useState(false);
  const [reservationsError, setReservationsError] = useState(null);

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
        .catch(err => {
          console.error(err);
          setReservationsError("Error Fetching today's reservations");
        })
        .finally(setLoadingReservations(false));
    }

    const today = new Date();
    const before = sub(today, { days: 30 });
    const fullName = "all";
    fetchTodaysReservations(before, today, fullName);
  }, []);

  const today = format(new Date(), "yyyyMMdd");

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

  const latestReservation =
    reservations &&
    reservations
      .filter(
        r =>
          r.reservation_status === "confirmed" ||
          r.reservation_status === "provisional"
      )
      .sort((a, b) => new Date(b.updated_At) - new Date(a.updated_At))
      .slice(0, 10);

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
        {reservations && (
          <HomeContainers
            message={messageThree}
            data={latestReservation}
            loading={loadingReservations}
            error={reservationsError}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
