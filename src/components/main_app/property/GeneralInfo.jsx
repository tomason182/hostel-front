import { Link } from "react-router-dom";
import { useRef } from "react";
import styles from "../../../styles/GeneralInfo.module.css";
import PropertyInfoSub from "./PropertyInfoSub";
import RoomTypesSub from "./RoomTypesSub";
import UsersSub from "./UsersSub";
import PropertyInfoForm from "../../forms/PropertyInfoForm";
import DialogHeader from "../../dialogs/DialogHeader";

function GeneralInfo() {
  const propertyDialog = useRef(null);
  const userDialog = useRef(null);

  return (
    <>
      <h3 className="dashboardTitles">General information</h3>
      <hr className="solidBreakLine" />
      <div className={styles.mainContainer}>
        <dialog ref={propertyDialog}>
          <DialogHeader title={"Property details"} refProps={propertyDialog} />
          <PropertyInfoForm />
        </dialog>
        <dialog ref={userDialog}>This is the dialog to update Users</dialog>
        <div className={styles.subContainer}>
          <h4>Property info</h4>
          <PropertyInfoSub />
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
    </>
  );
}

export default GeneralInfo;
