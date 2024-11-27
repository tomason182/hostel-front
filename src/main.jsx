import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import routes from "./utils/routes.jsx";
import disableConsole from "./utils/disableConsole.js";
import "./styles/variables.css";
import "./styles/global.css";

const router = createBrowserRouter(routes);

disableConsole();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </StrictMode>
);
