import styles from "../../styles/formDefaultStyle.module.css";

export default function GuestForm() {
  return (
    <form className={styles.mainForm}>
      <label>
        First Name
        <input
          type="text"
          name="firstName"
          minLength={1}
          maxLength={100}
          required
          aria-required
        />
      </label>
      <label>
        Last Name
        <input
          type="text"
          name="lastName"
          minLength={1}
          maxLength={100}
          required
          aria-required
        />
      </label>
      <label>
        Passport or ID number
        <input type="text" name="idNumber" minLength={1} maxLength={25} />
      </label>
      <fieldset>
        <legend>Contact info</legend>
        <label>
          Email
          <input
            type="email"
            name="email"
            required
            aria-required
            maxLength={50}
          />
        </label>
        <label>
          Phone Number
          <input type="text" name="phoneNumber" />
        </label>
      </fieldset>
      <fieldset>
        <legend>Address</legend>
        <label>
          City
          <input type="text" name="city" maxLength={50} />
        </label>
        <label>
          Street
          <input type="text" name="street" maxLength={100} />
        </label>
        <label>
          Postal Code
          <input type="text" name="postalCode" />
        </label>
        <label>
          Country code
          <input type="text" name="countryCode" />
        </label>
      </fieldset>
      <menu className={styles.buttonContainer}>
        <button className={styles.resetBtn}>Cancel</button>
        <button className={styles.submitBtn}>Continue</button>
      </menu>
    </form>
  );
}
