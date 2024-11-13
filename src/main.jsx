import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import routes from "./utils/routes.jsx";
import disableConsole from "./utils/disableConsole.js";
import "./styles/variables.css";
import "./styles/global.css";

const router = createBrowserRouter(routes);

disableConsole();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
