import LandingPage from "../components/landing_page/LandingPage";
import App from "../components/main_app/App";
import RegistrationPage from "../components/accounts/RegistrationPage";
import ErrorPage from "../components/error_page/ErrorPage";
import Property from "../components/main_app/property/Property";
import Home from "../components/main_app/home/Home";
import Calendar from "../components/main_app/calendar/Calendar";
import RateAndAvailability from "../components/main_app/ratesAndAvailability/RatesAndAvailability";
import Reservations from "../components/main_app/reservations/Reservations";

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
        path: "home",
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
        path: "property",
        element: <Property />,
      },
    ],
  },
];

export default routes;
