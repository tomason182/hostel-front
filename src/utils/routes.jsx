import LandingPage from "../components/landing_page/LandingPage";
import App from "../components/main_app/App";
import RegistrationPage from "../components/accounts/RegistrationPage";
import ErrorPage from "../components/error_page/ErrorPage";
import Home from "../components/main_app/home/Home";
import Calendar from "../components/main_app/calendar/Calendar";
import RateAndAvailability from "../components/main_app/ratesAndAvailability/RatesAndAvailability";
import Reservations from "../components/main_app/reservations/Reservations";
import GeneralInfo from "../components/main_app/property/GeneralInfo";
import PropertyDetails from "../components/main_app/property/PropertyDetails";
import RoomTypes from "../components/main_app/property/RoomTypes";

const routes = [
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/accounts/signup",
    element: <RegistrationPage />,
  },
  {
    path: "/app",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "calendar",
        element: <Calendar />,
      },
      {
        path: "rates-and-availability",
        element: <RateAndAvailability />,
      },
      {
        path: "reservations",
        element: <Reservations />,
      },
      {
        path: "property/general-info",
        element: <GeneralInfo />,
      },
      {
        path: "property/property-details",
        element: <PropertyDetails />,
      },
      {
        path: "property/room-types",
        element: <RoomTypes />,
      },
    ],
  },
];

export default routes;
