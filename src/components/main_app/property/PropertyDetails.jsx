import styles from "../../../styles/formDefaultStyle.module.css";
import { property } from "../../../data_mocked";

function PropertyDetails() {
  return (
    <form className={styles.mainForm}>
      <fieldset>
        <legend>Property name</legend>
        <label htmlFor="property_name" className={styles.hidden}>
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
      </fieldset>
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
      <fieldset>
        <legend>Address</legend>
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
      </fieldset>
      <menu className={styles.buttonContainer}>
        <button type="reset" className={styles.resetBtn}>
          Reset
        </button>
        <button type="submit" className={styles.submitBtn}>
          Save changes
        </button>
      </menu>
    </form>
  );
}

export default PropertyDetails;
