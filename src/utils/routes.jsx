import LandingPage from "../components/landing_page/LandingPage";
import App from "../components/main_app/App";

const routes = [
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/app",
    element: <App />,
  },
];

export default routes;
