import { Outlet } from "react-router-dom";
import HeaderMain from "./HeaderMain";
import NavigationMain from "./NavigationMain";
import MainMenuResponsive from "../menus/MainMenuResponsive";

function App() {
  return (
    <>
      <HeaderMain />
      <NavigationMain />
      <MainMenuResponsive />
      <Outlet />
    </>
  );
}

export default App;
