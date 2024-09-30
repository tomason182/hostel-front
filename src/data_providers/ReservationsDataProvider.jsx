import { createContext, useEffect, useState } from "react";
import { format } from "date-fns";
import PropTypes from "prop-types";

const ReservationContext = createContext();

export default function ReservationsDataProvider({ children }) {
  const [reservationsData, setReservationsData] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [fullName, setFullName] = useState(null);

  useEffect(() => {
    const fetchReservationData = (from, to, fullName) => {
      const formattedFormDate = format(from, "yyyyMMdd");
      const formattedToDate = format(to, "yyyyMMdd");

      const url =
        import.meta.env.VITE_URL_BASE +
        "reservations/find/" +
        formattedFormDate +
        "-" +
        formattedToDate +
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
        .then(data => {
          setReservationsData(data);
        })
        .catch(err =>
          console.error("Error fetching reservations data", err.message)
        );
    };

    if (fromDate && toDate) {
      fetchReservationData(fromDate, toDate, fullName);
    }
  }, [fromDate, toDate, fullName]);

  return (
    <ReservationContext.Provider
      value={{ reservationsData, setFromDate, setToDate, setFullName }}
    >
      {children}
    </ReservationContext.Provider>
  );
}

ReservationsDataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ReservationContext };
