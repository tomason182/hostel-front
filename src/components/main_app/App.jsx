import { Outlet } from "react-router-dom";
import HeaderMain from "./HeaderMain";
import NavigationMain from "./NavigationMain";
import MainMenuResponsive from "../menus/MainMenuResponsive";
import { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/users/profile", {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then(response => response.json())
      .then(data => setUser(data.msg))
      .catch(err => console.error("Error fetching users data: ", err));
  }, []);

  return (
    <>
      <HeaderMain user={user} />
      <NavigationMain />
      <MainMenuResponsive />
      <Outlet />
    </>
  );
}

export default App;
