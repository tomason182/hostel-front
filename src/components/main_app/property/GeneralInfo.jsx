import { Link } from "react-router-dom";
import { useRef } from "react";
import styles from "../../../styles/GeneralInfo.module.css";
import RoomTypesSub from "./RoomTypesSub";
import UsersSub from "./UsersSub";
import PropertyInfoSub from "./PropertyInfoSub";
import PropertyDetails from "../../forms/PropertyDetails";
import DialogHeader from "../../dialogs/DialogHeader";
import ContentTitle from "../../headers/ContentTitle";
import UserForm from "../../forms/UserForm";
import useFetch from "../../../hooks/useFetch";

function GeneralInfo() {
  const propertyDialog = useRef(null);
  const userDialog = useRef(null);

  const url = import.meta.env.VITE_URL_BASE + "properties";
  const options = {
    mode: "cors",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };
  const { data, error, loading } = useFetch({ url, options });

  return (
    <div className="main-content">
      <ContentTitle title={"General info"} />
      <div className={styles.mainContainer}>
        <dialog ref={propertyDialog} className="dialog">
          <DialogHeader title={"Property details"} refProps={propertyDialog} />
          <PropertyDetails refProps={propertyDialog} data={data} />
        </dialog>
        <dialog ref={userDialog} className="dialog">
          <DialogHeader title={"Add a User"} refProps={userDialog} />
          <UserForm refProps={userDialog} />
        </dialog>
        <div className={styles.subContainer}>
          <h4>Property info</h4>
          <PropertyInfoSub data={data} error={error} loading={loading} />
          <button
            className={styles.editBtn}
            onClick={() => propertyDialog.current?.showModal()}
          >
            Edit
          </button>
        </div>
        <div className={styles.subContainer}>
          <h4>Room types</h4>
          <RoomTypesSub />
          <Link to="/app/property/room-types">
            <button className={styles.editBtn}>Edit</button>
          </Link>
        </div>
        <div className={styles.subContainer}>
          <h4>Users</h4>
          <UsersSub />
          <button
            className={styles.editBtn}
            onClick={() => userDialog.current?.showModal()}
          >
            Edit
          </button>
        </div>
        <div className={styles.subContainer}>
          <h4>Active rate plans</h4>
        </div>
      </div>
    </div>
  );
}

export default GeneralInfo;
