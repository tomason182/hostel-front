import { Outlet } from "react-router-dom";
import HeaderMain from "./HeaderMain";
import NavigationMain from "./NavigationMain";
import MainMenuResponsive from "../menus/MainMenuResponsive";
import PropertyDetailsProvider from "../../data_providers/PropertyDetailsProvider";
import RoomTypeDataProvider from "../../data_providers/RoomTypesDataProvider";
import UsersDataProvider from "../../data_providers/UsersDataProvider";
import ReservationsDataProvider from "../../data_providers/ReservationsDataProvider";
import { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
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
      .then(data => setUser(data.msg))
      .catch(err => console.error("Error fetching users data: ", err));
  }, []);

  return (
    <>
      <HeaderMain user={user} />
      <NavigationMain />
      <MainMenuResponsive />
      <PropertyDetailsProvider>
        <RoomTypeDataProvider>
          <UsersDataProvider>
            <ReservationsDataProvider>
              <Outlet />
            </ReservationsDataProvider>
          </UsersDataProvider>
        </RoomTypeDataProvider>
      </PropertyDetailsProvider>
    </>
  );
}

export default App;
