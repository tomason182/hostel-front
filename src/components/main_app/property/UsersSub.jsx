import styles from "../../../styles/RoomTypesSub.module.css";
import PropTypes from "prop-types";

export default function UsersSub({
  refProps,
  usersData,
  setUserValues,
  setIsDialogOpen,
}) {
  if (!usersData) return <div>Loading...</div>;

  const users =
    usersData &&
    usersData.map(user => (
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
          <button
            onClick={() => {
              setUserValues({
                userId: user._id,
                firstName: user.first_name,
                lastName: user.last_name,
                role: user.role,
              });
              setIsDialogOpen(true);
              refProps.current?.showModal();
            }}
          >
            Edit
          </button>
        </div>
      </li>
    ));

  return <ul className={styles.roomTypesList}>{users}</ul>;
}

UsersSub.propTypes = {
  refProps: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  setUserValues: PropTypes.func.isRequired,
  usersData: PropTypes.array.isRequired,
  setIsDialogOpen: PropTypes.func.isRequired,
};
