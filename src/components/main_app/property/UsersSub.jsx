import { users } from "../../../data_mocked";
import styles from "../../../styles/RoomTypesSub.module.css";

export default function UsersSub() {
  const usersList = users.map(user => (
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

  return <ul className={styles.roomTypesList}>{usersList}</ul>;
}
