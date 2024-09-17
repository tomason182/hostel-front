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
import fetchDataHelper from "../../../utils/fetchDataHelper";

// In the following code I am going to comment the parts that are having issues

function GeneralInfo() {
  const propertyDialog = useRef(null); // Create a ref for property dialog
  const userDialog = useRef(null); // Create a ref for user dialog
  const propertyFormRef = useRef(null); // Create a ref for property form
  const userFormRef = useRef(null); // Create a ref for user form
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
  const [refreshData, setRefreshData] = useState(false);

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

  // handleCloseBtn should clear form values or restore them to default.
  // For userFormRef seems working fine, but not for propertyFormRef
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
        <dialog ref={propertyDialog} className="dialog">
          <DialogHeader // dialog header component has a close btn that should close dialog and restore form values
            title={"Property details"}
            refProps={propertyDialog} // pass propertyDialog and PropertyFormRef
            formRef={propertyFormRef}
            handleCloseBtn={handleCloseBtn} // pass the handleCloseBtn function
            loading={loading}
          />
          <PropertyDetails
            refProps={propertyDialog} // Pass the same propertyDialog and PropertyFromRef as in the DialogHeader
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
            handleCloseBtn={handleCloseBtn} // also pass the handleCloseBtn function
          />
        </dialog>
        <dialog ref={userDialog} className="dialog">
          <DialogHeader
            title={"Create new user"}
            refProps={userDialog} // pass the userDialog and userFormRef to the DialogHeader. But this time for the user dialog
            formRef={userFormRef}
            handleCloseBtn={handleCloseBtn} // pass the function
            loading={loading}
          />
          <UserForm
            refProps={userDialog}
            formRef={userFormRef}
            handleCloseBtn={handleCloseBtn}
            error={error}
            setError={setError}
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
          <UsersSub />
          <button
            className={styles.editBtn}
            onClick={() => userDialog.current?.showModal()}
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
