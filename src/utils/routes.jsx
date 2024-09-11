import LandingPage from "../components/landing_page/LandingPage";
import App from "../components/main_app/App";
import RegistrationPage from "../components/accounts/RegistrationPage";
import ErrorPage from "../components/error_page/ErrorPage";
import Home from "../components/main_app/home/Home";
import CalendarMainPage from "../components/main_app/calendar/CalendarMainPage";
import RateAndAvailability from "../components/main_app/ratesAndAvailability/RatesAndAvailability";
import Reservations from "../components/main_app/reservations/Reservations";
import GeneralInfo from "../components/main_app/property/GeneralInfo";
import PropertyDetails from "../components/main_app/property/PropertyDetails";
import RoomTypes from "../components/main_app/property/RoomTypes";
import LoginPage from "../components/accounts/LoginPage";
import ReservationDetails from "../components/main_app/reservations/ReservationDetails";

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
    path: "/accounts/login",
    element: <LoginPage />,
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
        element: <CalendarMainPage />,
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
        path: "reservations/:id",
        element: <ReservationDetails />,
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
