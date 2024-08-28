import { Outlet } from "react-router-dom";
import HeaderMain from "./HeaderMain";
import NavigationMain from "./NavigationMain";

function App() {
  return (
    <>
      <HeaderMain />
      <NavigationMain />
      <Outlet />
    </>
  );
}

export default App;
