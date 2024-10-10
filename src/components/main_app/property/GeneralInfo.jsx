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
import MessageDialog from "../../dialogs/MessageDialog";

function GeneralInfo() {
  const propertyDialogRef = useRef(null);
  const userDialogRef = useRef(null);
  const userUpdateDialogRef = useRef(null);
  const messageDialogRef = useRef(null);
  const [message, setMessage] = useState(null);
  const [status, setStatus] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [userValues, setUsersValue] = useState(null);

  const { propertyData, refreshPropertyData } = useContext(PropertyContext);
  const { usersData, refreshUsersData } = useContext(UsersContext);
  const { roomTypeData } = useContext(RoomTypeContext);

  useEffect(() => {
    function handleGeneralInfoDialogCloseOnEsc(e) {
      if (e.key === "Escape") {
        setIsDialogOpen(false);
      }
    }
    if (isDialogOpen) {
      document.addEventListener("keydown", handleGeneralInfoDialogCloseOnEsc);
    } else {
      document.removeEventListener(
        "keydown",
        handleGeneralInfoDialogCloseOnEsc
      );
    }
  }, [isDialogOpen]);

  return (
    <div className="main-content">
      <ContentTitle title={"General info"} />
      <div className={styles.mainContainer}>
        <MessageDialog
          message={message}
          status={status}
          refProps={messageDialogRef}
        />
        <dialog ref={propertyDialogRef} className="dialog">
          {isDialogOpen && (
            <>
              <DialogHeader
                title={"Property details"}
                refProps={propertyDialogRef}
                setIsDialogOpen={setIsDialogOpen}
              />
              <PropertyDetails
                refProps={propertyDialogRef}
                propertyData={propertyData}
                refreshPropertyData={refreshPropertyData}
                setIsDialogOpen={setIsDialogOpen}
                setMessage={setMessage}
                setStatus={setStatus}
              />
            </>
          )}
        </dialog>

        <dialog ref={userDialogRef} className="dialog">
          {isDialogOpen && (
            <>
              <DialogHeader
                title={"Create new user"}
                refProps={userDialogRef}
                setIsDialogOpen={setIsDialogOpen}
              />
              <UserForm
                refProps={userDialogRef}
                setMessage={setMessage}
                setStatus={setStatus}
                refreshUsersData={refreshUsersData}
                setIsDialogOpen={setIsDialogOpen}
              />
            </>
          )}
        </dialog>
        <dialog ref={userUpdateDialogRef} className="dialog">
          {isDialogOpen && userValues && (
            <>
              <DialogHeader
                title={"Update user"}
                refProps={userUpdateDialogRef}
                setIsDialogOpen={setIsDialogOpen}
              />
              <UserUpdateForm
                refProps={userUpdateDialogRef}
                userValues={userValues}
                setMessage={setMessage}
                setStatus={setStatus}
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
              propertyDialogRef.current?.showModal();
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
              refProps={userUpdateDialogRef}
              usersData={usersData}
              setUserValues={setUsersValue}
              setIsDialogOpen={setIsDialogOpen}
              setMessage={setMessage}
              setStatus={setStatus}
              refreshUsersData={refreshUsersData}
            />
          )}

          <button
            className={styles.editBtn}
            onClick={() => {
              setIsDialogOpen(true);
              userDialogRef.current?.showModal();
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
