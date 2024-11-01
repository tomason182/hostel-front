import styles from "../../styles/formDefaultStyle.module.css";
import ErrorComponent from "../error_page/ErrorComponent";
import PropTypes from "prop-types";
import fetchDataHelper from "../../utils/fetchDataHelper";
import { useState } from "react";

function PropertyDetails({
  refProps,
  propertyData,
  refreshPropertyData,
  setIsDialogOpen,
  setMessage,
  setStatus,
}) {
  const [data, setData] = useState({
    propertyName: propertyData?.propertyName || "",
    street: propertyData?.street || "",
    city: propertyData?.city || "",
    postalCode: propertyData?.postalCode || "",
    countryCode: propertyData?.countryCode || "",
    email: propertyData?.email || "",
    phoneNumber: propertyData?.phoneNumber || "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formBody = {
      propertyName: data.propertyName,
      ...(data.street && { street: data.street }),
      ...(data.city && { city: data.city }),
      ...(data.postalCode && {
        postalCode: data.postalCode,
      }),
      ...(data.countryCode && {
        countryCode: data.countryCode,
      }),
      ...(data.email && { email: data.email }),
      ...(data.phoneNumber && {
        phoneNumber: data.phoneNumber,
      }),
    };

    try {
      const url = import.meta.env.VITE_URL_BASE + "properties/update";
      const options = {
        mode: "cors",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formBody),
      };

      const { data, errors } = await fetchDataHelper(url, options);
      if (data) {
        setIsDialogOpen(false);
        refreshPropertyData();
        setMessage("Property updated successfully");
        setStatus("ok");
        refProps.current?.close();
      }

      if (errors) {
        setError(errors);
      }
    } catch (err) {
      setError([err.message || "Unexpected error occurred"]);
    } finally {
      setLoading(false);
    }
  }

  if (!propertyData) return <p>Loading...</p>;

  return (
    <form
      method="dialog"
      className={styles.mainForm}
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <label className={styles.label}>
        Property name:
        <input
          type="text"
          name="propertyName"
          aria-required
          minLength={1}
          maxLength={100}
          value={data.propertyName}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        Street
        <input
          type="text"
          name="street"
          maxLength={100}
          value={data.street}
          onChange={handleInputChange}
        />
      </label>
      <label>
        City
        <input
          type="text"
          name="city"
          value={data.city}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Postal Code
        <input
          type="text"
          name="postalCode"
          value={data.postalCode}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Country code
        <input
          type="text"
          name="countryCode"
          value={data.countryCode}
          onChange={handleInputChange}
        />
      </label>
      <fieldset>
        <legend>Contact info</legend>
        <label>
          Email
          <input
            type="text"
            name="email"
            value={data.email}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Phone number
          <input
            type="text"
            name="phoneNumber"
            value={data.phoneNumber}
            onChange={handleInputChange}
          />
        </label>
      </fieldset>
      <menu className={styles.buttonContainer}>
        <button
          type="reset"
          className={styles.resetBtn}
          onClick={() => {
            setIsDialogOpen(false);
            refProps.current?.close();
          }}
          disabled={loading}
        >
          Cancel
        </button>
        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? "Saving..." : "Save changes"}
        </button>
      </menu>
      {error && <ErrorComponent errors={error} />}
    </form>
  );
}

PropertyDetails.propTypes = {
  refProps: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  propertyData: PropTypes.object.isRequired,
  refreshPropertyData: PropTypes.func.isRequired,
  setIsDialogOpen: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
};

export default PropertyDetails;
