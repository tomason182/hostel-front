import styles from "../../../styles/formDefaultStyle.module.css";

function PropertyDetails() {
  const propertyDetails = {
    _id: "66ba803852508c4e121f1f5d",
    property_name: "The best hostel",
    address: {
      street: "Alguna calle 234",
      city: "Azul",
      postal_code: "7300",
      country_code: "AR",
    },
    contact_info: {
      phone_number: "+542281456213",
      email: "myemail@mail.com",
    },
    access_control: [
      {
        user_id: "66ba803852508c4e121f1f5c",
        role: "admin",
      },
      {
        user_id: "66ba8eab7300af884eff1a88",
        role: "employee",
      },
    ],
    createdAt: "2024-08-12T21:35:52.477Z",
    updatedAt: "2024-08-12T21:35:52.477Z",
  };

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
          defaultValue={propertyDetails.property_name}
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
          defaultValue={propertyDetails.contact_info.email}
        />
        <label htmlFor="phone">Phone number</label>
        <input
          type="text"
          name="phoneNumber"
          id="phone"
          defaultValue={propertyDetails.contact_info.phone_number}
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
          defaultValue={propertyDetails.address.street}
        />
        <label htmlFor="city">City</label>
        <input
          type="text"
          name="city"
          id="city"
          defaultValue={propertyDetails.address.city}
        />
        <label htmlFor="postal_code">Postal Code</label>
        <input
          type="text"
          name="postalCode"
          id="postal_code"
          defaultValue={propertyDetails.address.postal_code}
        />
        <label htmlFor="country_code">Country code</label>
        <input
          type="text"
          name="countryCode"
          id="country_code"
          defaultValue={propertyDetails.address.country_code}
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
