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
import fetchDataHelper from "../../../utils/fetchDataHelper";

function GeneralInfo() {
  const propertyDialog = useRef(null);
  const userDialog = useRef(null);
  const propertyFormRef = useRef(null);
  const userFormRef = useRef(null);
  const userUpdateDialog = useRef(null);
  const userUpdateFormRef = useRef(null);
  const successDialogRef = useRef(null);
  const [propertyData, setPropertyData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formPropertyValues, setFormPropertyValues] = useState({
    propertyName: "",
    street: "",
    city: "",
    postalCode: "",
    countryCode: "",
    phoneNumber: "",
    email: "",
  });
  const [userValues, setUserValues] = useState(null);
  const [isUserUpdated, setIsUserUpdated] = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  const [successFulMsg, setSuccessfulMsg] = useState(null);

  useEffect(() => {
    setRefreshData(false);
    if (successFulMsg) {
      successDialogRef.current?.showModal();

      setTimeout(() => {
        successDialogRef.current?.close();
      }, 1000);
    }
  }, [successFulMsg]);

  useEffect(() => {
    async function fetchPropertyData() {
      setLoading(true);
      setError(null);

      try {
        const url = import.meta.env.VITE_URL_BASE + "properties";
        const options = {
          mode: "cors",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        };
        const { data, errors = [] } = await fetchDataHelper(url, options);
        if (data) {
          setPropertyData(data);
        }
        if (errors) {
          setError(errors);
        }
      } catch (err) {
        setError([{ msg: err.message || "Unexpected error occurred" }]);
      } finally {
        setLoading(false);
      }
    }
    fetchPropertyData();
  }, [refreshData]);

  useEffect(() => {
    function handlePropertyFormValues() {
      setFormPropertyValues({
        propertyName: propertyData?.property_name || "",
        street: propertyData?.address.street || "",
        city: propertyData?.address.city || "",
        postalCode: propertyData?.address.postal_code || "",
        countryCode: propertyData?.address.country_code || "",
        phoneNumber: propertyData?.contact_info.phone_number || "",
        email: propertyData?.contact_info.email || "",
      });
    }

    handlePropertyFormValues();
  }, [propertyData]);

  function handleCloseBtn(refProps, formRef) {
    if (formRef === userFormRef) {
      formRef.current.reset();
    } else if (formRef === propertyFormRef) {
      setFormPropertyValues({
        propertyName: propertyData?.property_name || "",
        street: propertyData?.address.street || "",
        city: propertyData?.address.city || "",
        postalCode: propertyData?.address.postal_code || "",
        countryCode: propertyData?.address.country_code || "",
        phoneNumber: propertyData?.contact_info.phone_number || "",
        email: propertyData?.contact_info.email || "",
      });
    }
    refProps.current?.close();
    setError(null);
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
            loading={loading}
          />
          <PropertyDetails
            refProps={propertyDialog}
            formRef={propertyFormRef}
            propertyData={propertyData}
            loading={loading}
            setLoading={setLoading}
            error={error}
            setError={setError}
            refreshData={refreshData}
            setRefreshData={setRefreshData}
            formPropertyValues={formPropertyValues}
            setFormPropertyValues={setFormPropertyValues}
            handleCloseBtn={handleCloseBtn}
          />
        </dialog>
        <dialog ref={userDialog} className="dialog">
          <DialogHeader
            title={"Create new user"}
            refProps={userDialog}
            formRef={userFormRef}
            handleCloseBtn={handleCloseBtn}
            loading={loading}
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
            data={propertyData}
            error={error}
            loading={loading}
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
