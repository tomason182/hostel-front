import { Link } from "react-router-dom";
import { useRef } from "react";
import styles from "../../../styles/GeneralInfo.module.css";
import PropertyInfoSub from "./PropertyInfoSub";
import RoomTypesSub from "./RoomTypesSub";
import UsersSub from "./UsersSub";
import PropertyInfoForm from "../../forms/PropertyInfoForm";
import DialogHeader from "../../dialogs/DialogHeader";
import ContentTitle from "../../headers/ContentTitle";
import UserForm from "../../forms/UserForm";

function GeneralInfo() {
  const propertyDialog = useRef(null);
  const userDialog = useRef(null);

  return (
    <>
      <ContentTitle title={"General info"} />
      <div className={styles.mainContainer}>
        <dialog ref={propertyDialog} className="dialog">
          <DialogHeader title={"Property details"} refProps={propertyDialog} />
          <PropertyInfoForm refProps={propertyDialog} />
        </dialog>
        <dialog ref={userDialog} className="dialog">
          <DialogHeader title={"Add a User"} refProps={userDialog} />
          <UserForm refProps={userDialog} />
        </dialog>
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
