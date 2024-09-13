import ProfileBtn from "../buttons/ProfileBtn";
import ToggleThemeBtn from "../buttons/ToggleThemeBtn";
import NotificationBtn from "../buttons/NotificationBtn";
import MainSearch from "../forms/MainSearch";
import styles from "../../styles/HeaderMain.module.css";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";

function HeaderMain() {
  const [name, setName] = useState(null);
  const [propertyName, setPropertyName] = useState(null);

  const { data, error, loading } = useFetch(
    name === null
      ? {
          url: "http://localhost:5000/api/v1/users/profile",
          options: {
            mode: "cors",
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          },
        }
      : {
          url: null,
          options: null,
        }
  );

  useEffect(() => {
    if (data) {
      const obj = data.msg;
      const userName = obj.user_info["first_name"];
      const propertyName = obj.property_name;
      setName(userName);
      setPropertyName(propertyName);
    }
    if (error) {
      console.error("Error: ", error);
      setName("User's default name");
      setPropertyName("Property name");
    }
  }, [data, error]);

  return (
    <header className={styles.header}>
      <h1>Page Logo</h1>
      <MainSearch />
      <div className={styles.info}>
        <div className={styles.hostelInfo}>
          <h3>{loading ? "Loading property name" : propertyName}</h3>
          <p>{loading ? "Loading user name" : name}</p>
        </div>
        <NotificationBtn />
        <ToggleThemeBtn />
        <ProfileBtn />
      </div>
    </header>
  );
}

export default HeaderMain;
