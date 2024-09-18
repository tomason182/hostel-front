import styles from "../../../styles/PropertyInfoSub.module.css";
import { useState, useEffect } from "react";
import fetchDataHelper from "../../../utils/fetchDataHelper";
import PropTypes from "prop-types";

export default function PropertyInfoSub({
  propertyData,
  setPropertyData,
  isPropertyUpdated,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
        const { data, errors } = await fetchDataHelper(url, options);
        if (data) {
          const dataObj = {
            propertyName: data.property_name,
            street: data.address.street,
            city: data.address.city,
            postalCode: data.address.postal_code,
            countryCode: data.address.country_code,
            phoneNumber: data.contact_info.phone_number,
            email: data.contact_info.email,
          };
          setPropertyData(dataObj);
          return;
        }
        if (errors) {
          setError(errors);
          return;
        }
      } catch (err) {
        setError([{ msg: err.message || "Unexpected error occurred" }]);
      } finally {
        setLoading(false);
      }
    }
    fetchPropertyData();
  }, [isPropertyUpdated, setPropertyData]);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>A network error was encountered</div>;

  return (
    <>
      <dl className={styles.dlist}>
        <dt>Property name</dt>
        <dd>{propertyData ? propertyData.propertyName : ""}</dd>
        <dt>Address</dt>
        <dd>Street: {propertyData ? propertyData.street : ""}</dd>
        <dd>City: {propertyData ? propertyData.city : ""}</dd>
        <dd>Postal code: {propertyData ? propertyData.postalCode : ""}</dd>
        <dd>Country code: {propertyData ? propertyData.countryCode : ""}</dd>
        <dt>Contact info</dt>
        <dd>Phone number: {propertyData ? propertyData.phoneNumber : ""}</dd>
        <dd>email: {propertyData ? propertyData.email : ""}</dd>
      </dl>
    </>
  );
}

PropertyInfoSub.propTypes = {
  propertyData: PropTypes.object,
  setPropertyData: PropTypes.func.isRequired,
  isPropertyUpdated: PropTypes.bool,
};
