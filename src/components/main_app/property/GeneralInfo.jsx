import { Link } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import styles from "../../../styles/GeneralInfo.module.css";
import RoomTypesSub from "./RoomTypesSub";
import UsersSub from "./UsersSub";
import PropertyInfoSub from "./PropertyInfoSub";
import PropertyDetails from "../../forms/PropertyDetails";
import DialogHeader from "../../dialogs/DialogHeader";
import ContentTitle from "../../headers/ContentTitle";
import UserForm from "../../forms/UserForm";
import UserUpdateForm from "../../forms/UserUpdateFrom";
// Import data providers
import { PropertyContext } from "../../../data_providers/PropertyDetailsProvider";
import { UsersContext } from "../../../data_providers/UsersDataProvider";
import { RoomTypeContext } from "../../../data_providers/RoomTypesDataProvider";

function GeneralInfo() {
  const propertyDialog = useRef(null);
  const userDialog = useRef(null);
  const userUpdateDialog = useRef(null);
  const successDialogRef = useRef(null);
  const [successFulMsg, setSuccessfulMsg] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [userValues, setUsersValue] = useState(null);

  const { propertyData, refreshPropertyData } = useContext(PropertyContext);
  const { usersData, refreshUsersData } = useContext(UsersContext);
  const { roomTypeData } = useContext(RoomTypeContext);

  useEffect(() => {
    if (successFulMsg) {
      successDialogRef.current?.showModal();

      setTimeout(() => {
        successDialogRef.current?.close();
      }, 2500);
    }
  }, [successFulMsg]);

  return (
    <div className="main-content">
      <ContentTitle title={"General info"} />
      <div className={styles.mainContainer}>
        <dialog ref={successDialogRef}>
          <p>{successFulMsg}</p>
        </dialog>
        <dialog ref={propertyDialog} className="dialog">
          {isDialogOpen && (
            <>
              <DialogHeader
                title={"Property details"}
                refProps={propertyDialog}
                setIsDialogOpen={setIsDialogOpen}
              />
              <PropertyDetails
                refProps={propertyDialog}
                propertyData={propertyData}
                refreshPropertyData={refreshPropertyData}
                setIsDialogOpen={setIsDialogOpen}
              />
            </>
          )}
        </dialog>
        <dialog ref={userDialog} className="dialog">
          {isDialogOpen && (
            <>
              <DialogHeader
                title={"Create new user"}
                refProps={userDialog}
                setIsDialogOpen={setIsDialogOpen}
              />
              <UserForm
                refProps={userDialog}
                setSuccessfulMsg={setSuccessfulMsg}
                refreshUsersData={refreshUsersData}
                setIsDialogOpen={setIsDialogOpen}
              />
            </>
          )}
        </dialog>
        <dialog ref={userUpdateDialog} className="dialog">
          {isDialogOpen && userValues && (
            <>
              <DialogHeader
                title={"Update user"}
                refProps={userUpdateDialog}
                setIsDialogOpen={setIsDialogOpen}
              />
              <UserUpdateForm
                refProps={userUpdateDialog}
                userValues={userValues}
                setSuccessfulMsg={setSuccessfulMsg}
                refreshUsersData={refreshUsersData}
                setIsDialogOpen={setIsDialogOpen}
              />
            </>
          )}
        </dialog>
        <div className={styles.subContainer}>
          <h4>Property info</h4>
          {!propertyData ? (
            <p>Loading...</p>
          ) : (
            <PropertyInfoSub propertyData={propertyData} />
          )}

          <button
            className={styles.editBtn}
            onClick={() => {
              setIsDialogOpen(true);
              propertyDialog.current?.showModal();
            }}
          >
            Edit
          </button>
        </div>
        <div className={styles.subContainer}>
          <h4>Room types</h4>
          {!roomTypeData ? (
            <p>Loading...</p>
          ) : (
            <RoomTypesSub roomTypeData={roomTypeData} />
          )}

          <Link to="/app/property/room-types">
            <button className={styles.editBtn}>Edit</button>
          </Link>
        </div>
        <div className={styles.subContainer}>
          <h4>Users</h4>
          {!usersData ? (
            <p>Loading...</p>
          ) : (
            <UsersSub
              refProps={userUpdateDialog}
              usersData={usersData}
              setUserValues={setUsersValue}
              setIsDialogOpen={setIsDialogOpen}
            />
          )}

          <button
            className={styles.editBtn}
            onClick={() => {
              setIsDialogOpen(true);
              userDialog.current?.showModal();
            }}
          >
            Add user
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
