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
        <div className={styles.btnMenu}>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="14 2 18 6 7 17 3 17 3 13 14 2"></polygon>
              <line x1="3" y1="22" x2="21" y2="22"></line>
            </svg>
          </button>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
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
