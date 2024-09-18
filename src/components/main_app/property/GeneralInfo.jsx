import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import styles from "../../../styles/GeneralInfo.module.css";
import RoomTypesSub from "./RoomTypesSub";
import UsersSub from "./UsersSub";
import PropertyInfoSub from "./PropertyInfoSub";
import PropertyDetails from "../../forms/PropertyDetails";
import DialogHeader from "../../dialogs/DialogHeader";
import ContentTitle from "../../headers/ContentTitle";
import UserForm from "../../forms/UserForm";
import UserUpdateForm from "../../forms/UserUpdateFrom";

function GeneralInfo() {
  const propertyDialog = useRef(null);
  const userDialog = useRef(null);
  const propertyFormRef = useRef(null);
  const userFormRef = useRef(null);
  const userUpdateDialog = useRef(null);
  const userUpdateFormRef = useRef(null);
  const successDialogRef = useRef(null);
  const [propertyData, setPropertyData] = useState(null);
  const [userValues, setUserValues] = useState(null);
  const [isUserUpdated, setIsUserUpdated] = useState(false);
  const [isPropertyUpdated, setIsPropertyUpdated] = useState(false);
  const [successFulMsg, setSuccessfulMsg] = useState(null);

  useEffect(() => {
    if (successFulMsg) {
      successDialogRef.current?.showModal();

      setTimeout(() => {
        successDialogRef.current?.close();
      }, 2500);
    }
  }, [successFulMsg]);

  function handleCloseBtn(refProps, formRef) {
    if (formRef === userFormRef) {
      formRef.current.reset();
    } else if (formRef === propertyFormRef) {
      setPropertyData({
        propertyName: propertyData?.propertyName || "",
        street: propertyData?.street || "",
        city: propertyData?.city || "",
        postalCode: propertyData?.postalCode || "",
        countryCode: propertyData?.countryCode || "",
        phoneNumber: propertyData?.phoneNumber || "",
        email: propertyData?.email || "",
      });
    }
    refProps.current?.close();
  }

  return (
    <div className="main-content">
      <ContentTitle title={"General info"} />
      <div className={styles.mainContainer}>
        <dialog ref={successDialogRef}>
          <p>{successFulMsg}</p>
        </dialog>
        <dialog ref={propertyDialog} className="dialog">
          <DialogHeader
            title={"Property details"}
            refProps={propertyDialog}
            formRef={propertyFormRef}
            handleCloseBtn={handleCloseBtn}
          />
          <PropertyDetails
            refProps={propertyDialog}
            formRef={propertyFormRef}
            propertyData={propertyData}
            handleCloseBtn={handleCloseBtn}
            setIsPropertyUpdated={setIsPropertyUpdated}
          />
        </dialog>
        <dialog ref={userDialog} className="dialog">
          <DialogHeader
            title={"Create new user"}
            refProps={userDialog}
            formRef={userFormRef}
            handleCloseBtn={handleCloseBtn}
          />
          <UserForm
            refProps={userDialog}
            formRef={userFormRef}
            handleCloseBtn={handleCloseBtn}
            setSuccessfulMsg={setSuccessfulMsg}
            setIsUserUpdated={setIsUserUpdated}
          />
        </dialog>
        <dialog ref={userUpdateDialog} className="dialog">
          <DialogHeader
            title={"Update user"}
            refProps={userUpdateDialog}
            formRef={userUpdateFormRef}
            handleCloseBtn={handleCloseBtn}
          />
          <UserUpdateForm
            formRef={userUpdateFormRef}
            refProps={userUpdateDialog}
            userValues={userValues}
            setSuccessfulMsg={setSuccessfulMsg}
            setIsUserUpdated={setIsUserUpdated}
          />
        </dialog>
        <div className={styles.subContainer}>
          <h4>Property info</h4>
          <PropertyInfoSub
            propertyData={propertyData}
            setPropertyData={setPropertyData}
            isPropertyUpdated={isPropertyUpdated}
          />
          <button
            className={styles.editBtn}
            onClick={() => {
              propertyDialog.current?.showModal();
            }}
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
          <UsersSub
            refProps={userUpdateDialog}
            setUserValues={setUserValues}
            isUserUpdated={isUserUpdated}
          />
          <button
            className={styles.editBtn}
            onClick={() => {
              userDialog.current?.showModal(), userDialog.current?.focus();
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
