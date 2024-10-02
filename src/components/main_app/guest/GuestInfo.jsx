import PropTypes from "prop-types";
import { useEffect, useState } from "react";

export default function GuestInfo({ setToggleDisplay, guestId }) {
  const [guestData, setGuestData] = useState([]);
  console.log(guestData);

  useEffect(() => {
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
        .then(data => setGuestData(data))
        .catch(err => console.error(err));
    }

    fetchGuestData(guestId);
  }, [guestId]);

  if (!guestData) return <div>Loading...</div>;

  return (
    <div>
      <p>guest infromation</p>
      <button onClick={() => setToggleDisplay(1)}>Back to reservation</button>
    </div>
  );
}

GuestInfo.propTypes = {
  setToggleDisplay: PropTypes.func.isRequired,
  guestId: PropTypes.string.isRequired,
};
