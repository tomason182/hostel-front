import { property } from "../../data_mocked.js";
import styles from "../../styles/formDefaultStyle.module.css";
import PropTypes from "prop-types";

function PropertyDetails({ refProps }) {
  return (
    <form method="dialog" className={styles.mainForm}>
      <label htmlFor="property_name" className={styles.label}>
        Property name:
      </label>
      <input
        type="text"
        id="property_name"
        aria-required
        minLength={2}
        maxLength={50}
        defaultValue={property.property_name}
        required
      />

      <label htmlFor="street">Street</label>
      <input
        type="text"
        name="street"
        id="street"
        maxLength={50}
        defaultValue={property.address.street}
      />
      <label htmlFor="city">City</label>
      <input
        type="text"
        name="city"
        id="city"
        defaultValue={property.address.city}
      />
      <label htmlFor="postal_code">Postal Code</label>
      <input
        type="text"
        name="postalCode"
        id="postal_code"
        defaultValue={property.address.postal_code}
      />
      <label htmlFor="country_code">Country code</label>
      <input
        type="text"
        name="countryCode"
        id="country_code"
        defaultValue={property.address.country_code}
      />
      <fieldset>
        <legend>Contact info</legend>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          defaultValue={property.contact_info.email}
        />
        <label htmlFor="phone">Phone number</label>
        <input
          type="text"
          name="phoneNumber"
          id="phone"
          defaultValue={property.contact_info.phone_number}
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
        <button type="submit" className={styles.submitBtn}>
          Save changes
        </button>
      </menu>
    </form>
  );
}

PropertyDetails.propTypes = {
  refProps: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
};

export default PropertyDetails;