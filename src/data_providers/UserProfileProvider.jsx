import { createContext, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";

const UserProfileContext = createContext();

export default function UserProfileProvider({ children }) {
  const [userProfile, setUserProfile] = useState(null);

  const fetchUserProfileData = useCallback(() => {
    const url = import.meta.env.VITE_URL_BASE + "users/profile";
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
      .then(data => setUserProfile(data.msg))
      .catch(err => console.error("Error fetching users data: ", err));
  }, []);

  useEffect(() => {
    fetchUserProfileData();
  }, [fetchUserProfileData]);

  return (
    <UserProfileContext.Provider
      value={{ userProfile, refreshUserProfile: fetchUserProfileData }}
    >
      {children}
    </UserProfileContext.Provider>
  );
}

UserProfileProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UserProfileContext };
