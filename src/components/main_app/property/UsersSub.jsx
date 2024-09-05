import { users } from "../../../data_mocked";

export default function UsersSub() {
  const usersList = users.map(user => (
    <li key={user._id}>
      <span>{user._id}</span>
      <p>
        {user.first_name}&nbsp;{user.last_name}
      </p>
      <p>{user.username}</p>
      <span>{user.role}</span>
    </li>
  ));

  return <ul>{usersList}</ul>;
}
