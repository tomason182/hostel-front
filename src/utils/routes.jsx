import LandingPage from "../components/landing_page/LandingPage";
import App from "../components/main_app/App";
import RegistrationPage from "../components/accounts/RegistrationPage";
import ErrorPage from "../components/error_page/ErrorPage";
import Home from "../components/main_app/home/Home";
import CalendarMainPage from "../components/main_app/calendar/CalendarMainPage";
import RateAndAvailability from "../components/main_app/ratesAndAvailability/RatesAndAvailability";
import Reservations from "../components/main_app/reservations/Reservations";
import ReservationDetails from "../components/main_app/reservations/ReservationDetails";
import GeneralInfo from "../components/main_app/property/GeneralInfo";
import RoomTypes from "../components/main_app/property/RoomTypes";
import LoginPage from "../components/accounts/LoginPage";
import Profile from "../components/accounts/Profile.jsx";

import ProtectedRoutes from "../hooks/ProtectedRoutes";
import isAuthenticated from "../hooks/isAuthenticated.js";
import Terms from "../components/landing_page/Terms.jsx";

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
    path: "/legal/terms-of-use",
    element: <Terms />,
  },
  {
    element: <ProtectedRoutes isAuthenticated={isAuthenticated} />,
    children: [
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
            path: "property/room-types",
            element: <RoomTypes />,
          },
          {
            path: "users/profile/edit",
            element: <Profile />,
          },
        ],
      },
    ],
  },
];

export default routes;
