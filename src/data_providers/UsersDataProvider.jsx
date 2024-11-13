import { createContext, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";

const UsersContext = createContext();

export default function UsersDataProvider({ children }) {
  const [usersData, setUsersData] = useState(null);

  const fetchUsersData = useCallback(() => {
    const url = import.meta.env.VITE_URL_BASE + "users/all";
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
      .then(data => setUsersData(data.msg))
      .catch(err => console.error("Error fetching users data", err.message));
  }, []);

  useEffect(() => {
    fetchUsersData();
  }, [fetchUsersData]);

  return (
    <UsersContext.Provider
      value={{ usersData, refreshUsersData: fetchUsersData }}
    >
      {children}
    </UsersContext.Provider>
  );
}

UsersDataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UsersContext };
