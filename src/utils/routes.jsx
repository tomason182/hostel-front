import LandingPage from "../components/landing_page/LandingPage";
import App from "../components/main_app/App";
import RegistrationPage from "../components/accounts/RegistrationPage";
import ErrorPage from "../components/error_page/ErrorPage";

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
  },
];

export default routes;
