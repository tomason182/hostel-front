import styles from "../../styles/formDefaultStyle.module.css";
import { useEffect, useState } from "react";
import Error from "../error_page/Error";
import PropTypes from "prop-types";

function PropertyDetails({ refProps, data }) {
  const [isSubmit, setIsSubmit] = useState(false);
  const [error, setError] = useState(null);
  const [formValues, setFormValues] = useState({
    propertyName: "",
    street: "",
    city: "",
    postalCode: "",
    countryCode: "",
    phoneNumber: "",
    email: "",
  });

  useEffect(() => {
    function handleFormValues() {
      setFormValues({
        propertyName: data?.property_name || "",
        street: data?.address.street || "",
        city: data?.address.city || "",
        postalCode: data?.postal_code || "",
        countryCode: data?.country_code || "",
        phoneNumber: data?.contact_info.phone_number || "",
        email: data?.contact_info.email || "",
      });
    }

    handleFormValues();
  }, [data]);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmit(true);

    const formBody = {
      propertyName: formValues.propertyName,
      street: formValues.street,
      city: formValues.city,
      postalCode: formValues.postalCode,
      countryCode: formValues.countryCode,
      email: formValues.email,
      phoneNumber: formValues.phoneNumber,
    };

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

    try {
      const response = await fetch(url, options);
      const newData = await response.json();
      console.log(newData);

      if (response.ok) {
        alert("Property data updated successfully");
      } else if (response.status === 400 && Array.isArray(newData)) {
        setError(newData);
      } else {
        throw new Error(newData.message || "Error updating property data");
      }
    } catch (err) {
      setError(err);
      console.error("Error during property update: ", err);
    } finally {
      setIsSubmit(false);
      /* refProps.current?.close(); */
    }
  }

  return (
    <form method="dialog" className={styles.mainForm} onSubmit={handleSubmit}>
      <label htmlFor="propertyName" className={styles.label}>
        Property name:
      </label>
      <input
        type="text"
        id="propertyName"
        name="propertyName"
        aria-required
        minLength={2}
        maxLength={50}
        value={formValues.propertyName}
        onChange={handleInputChange}
        required
      />

      <label htmlFor="street">Street</label>
      <input
        type="text"
        name="street"
        id="street"
        maxLength={50}
        value={formValues.street}
        onChange={handleInputChange}
      />
      <label htmlFor="city">City</label>
      <input
        type="text"
        name="city"
        id="city"
        value={formValues.city}
        onChange={handleInputChange}
      />
      <label htmlFor="postalCode">Postal Code</label>
      <input
        type="text"
        name="postalCode"
        id="postalCode"
        value={formValues.postalCode}
        onChange={handleInputChange}
      />
      <label htmlFor="countryCode">Country code</label>
      <input
        type="text"
        name="countryCode"
        id="countryCode"
        value={formValues.countryCode}
        onChange={handleInputChange}
      />
      <fieldset>
        <legend>Contact info</legend>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          value={formValues.email}
          onChange={handleInputChange}
        />
        <label htmlFor="phoneNumber">Phone number</label>
        <input
          type="text"
          name="phoneNumber"
          id="phoneNumber"
          value={formValues.phoneNumber}
          onChange={handleInputChange}
        />
      </fieldset>
      <menu className={styles.buttonContainer}>
        <button
          type="reset"
          className={styles.resetBtn}
          onClick={() => refProps.current?.close()}
        >
          Cancel
        </button>
        <button type="submit" className={styles.submitBtn} disabled={isSubmit}>
          {isSubmit ? "Saving..." : "Save changes"}
        </button>
      </menu>
      {error && (
        <ul className="errorMsg">
          <Error error={error} />
        </ul>
      )}
    </form>
  );
}

PropertyDetails.propTypes = {
  refProps: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  data: PropTypes.object,
};

export default PropertyDetails;
