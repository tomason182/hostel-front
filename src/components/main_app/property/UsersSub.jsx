import { useEffect, useState } from "react";
import { users } from "../../../data_mocked";
import styles from "../../../styles/RoomTypesSub.module.css";
import fetchDataHelper from "../../../utils/fetchDataHelper";

export default function UsersSub() {
  const [usersList, setUsersList] = useState(null);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log(usersList);

  useEffect(() => {
    async function fetchPropertyUsers() {
      setLoading(true);
      setErrors(null);

      try {
        const url = import.meta.env.VITE_URL_BASE + "users/all";
        const options = {
          mode: "cors",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        };
        const { data, error } = await fetchDataHelper(url, options);

        if (data) {
          setUsersList(data.msg);
        }

        if (error) {
          setErrors(error);
        }
      } catch (err) {
        setErrors([{ msg: err.message || "Unexpected error occurred" }]);
      } finally {
        setLoading(false);
      }
    }

    fetchPropertyUsers();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (errors) return <div>Network errors</div>;

  const users =
    usersList &&
    usersList.map(user => (
      <li key={user._id}>
        <span>{user._id}</span>
        <p>
          {user.first_name}&nbsp;{user.last_name}
        </p>
        <p>{user.username}</p>
        <div className={styles.info}>
          <span>{user.role}</span>
        </div>
      </li>
    ));

  return <ul className={styles.roomTypesList}>{users}</ul>;
}
