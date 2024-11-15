import { Outlet } from "react-router-dom";
import HeaderMain from "./HeaderMain";
import NavigationMain from "./NavigationMain";
import MainMenuResponsive from "../menus/MainMenuResponsive";
import PropertyDetailsProvider from "../../data_providers/PropertyDetailsProvider";
import RoomTypeDataProvider from "../../data_providers/RoomTypesDataProvider";
import UsersDataProvider from "../../data_providers/UsersDataProvider";
import ReservationsDataProvider from "../../data_providers/ReservationsDataProvider";
import UserProfileProvider from "../../data_providers/UserProfileProvider";
import { Helmet } from "react-helmet";

function App() {
  return (
    <>
      <Helmet>
        <title>Dashboard | SimpleHostel</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <UserProfileProvider>
        <PropertyDetailsProvider>
          <RoomTypeDataProvider>
            <UsersDataProvider>
              <HeaderMain />
              <NavigationMain />
              <MainMenuResponsive />
              <ReservationsDataProvider>
                <Outlet />
              </ReservationsDataProvider>
            </UsersDataProvider>
          </RoomTypeDataProvider>
        </PropertyDetailsProvider>
      </UserProfileProvider>
    </>
  );
}

export default App;
