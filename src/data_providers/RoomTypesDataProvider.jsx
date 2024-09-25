import { createContext, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";

const RoomTypeContext = createContext();

export default function RoomTypeDataProvider({ children }) {
  const [roomTypeData, setRoomTypeData] = useState(null);

  const fetchRoomTypeData = useCallback(() => {
    const url = import.meta.env.VITE_URL_BASE + "room-types";
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
      .then(data => setRoomTypeData(data))
      .catch(err => console.error("Error fetching room type data", err));
  }, []);

  useEffect(() => {
    fetchRoomTypeData();
  }, [fetchRoomTypeData]);

  return (
    <RoomTypeContext.Provider
      value={{ roomTypeData, refreshRoomTypeData: fetchRoomTypeData }}
    >
      {children}
    </RoomTypeContext.Provider>
  );
}

RoomTypeDataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { RoomTypeContext };
