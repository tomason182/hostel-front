import LandingPage from "../components/landing_page/LandingPage";
import App from "../components/main_app/App";
import ErrorPage from "../components/error_page/ErrorPage";

const routes = [
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/app",
    element: <App />,
  },
];

export default routes;
