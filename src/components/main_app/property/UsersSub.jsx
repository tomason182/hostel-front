import { useEffect, useState } from "react";
import styles from "../../../styles/RoomTypesSub.module.css";
import fetchDataHelper from "../../../utils/fetchDataHelper";

export default function UsersSub() {
  const [usersList, setUsersList] = useState(null);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

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
          return;
        }

        if (error) {
          setErrors(error);
          return;
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
        <div>
          <p>
            {user.first_name}&nbsp;{user.last_name}
          </p>
        </div>
        <div>
          <p>{user.username}</p>
        </div>

        <div className={styles.info}>
          <span>{user.role}</span>
        </div>
        <div>
          <button>Edit</button>
        </div>
      </li>
    ));

  return <ul className={styles.roomTypesList}>{users}</ul>;
}
