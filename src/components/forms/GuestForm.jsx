import styles from "../../styles/formDefaultStyle.module.css";
import PropTypes from "prop-types";
import fetchDataHelper from "../../utils/fetchDataHelper";
import { useState } from "react";
import ErrorComponent from "../error_page/ErrorComponent";

export default function GuestForm({
  guestData,
  setIndex,
  email,
  guestId,
  setGuestId,
}) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [guestFormData, SetGuestFormData] = useState(guestData);

  function handleInputChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    SetGuestFormData({
      ...guestFormData,
      [name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const body = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      email: e.target.email.value,
      ...(e.target.idNumber.value && { idNumber: e.target.idNumber.value }),
      ...(e.target.phoneNumber.value && {
        phoneNumber: e.target.phoneNumber.value,
      }),
      ...(e.target.city.value && { city: e.target.city.value }),
      ...(e.target.street.value && { street: e.target.street.value }),
      ...(e.target.postalCode.value && {
        postalCode: e.target.postalCode.value,
      }),
      ...(e.target.countryCode.value && {
        countryCode: e.target.countryCode.value,
      }),
    };

    if (guestId === null) {
      try {
        setLoading(true);

        const url = import.meta.env.VITE_URL_BASE + "guests/create";
        const options = {
          mode: "cors",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(body),
        };

        const { data, errors } = await fetchDataHelper(url, options);

        if (errors) {
          console.error(errors);
          setError(errors);
          return;
        }

        if (data) {
          console.log(data);
          setGuestId(data.msg);
          setIndex(2);
        }
      } catch (err) {
        console.error(err.message);
        setError([{ msg: err.message || "Unexpected error occurred" }]);
      } finally {
        setLoading(false);
      }
    } else if (
      guestData.firstName !== e.target.firstName.value ||
      guestData.lastName !== e.target.lastName.value ||
      guestData.idNumber !== e.target.idNumber.value ||
      guestData.phoneNumber !== e.target.phoneNumber.value ||
      guestData.city !== e.target.city.value ||
      guestData.street !== e.target.street.value ||
      guestData.postalCode !== e.target.postalCode.value ||
      guestData.countryCode !== e.target.countryCode.value
    ) {
      try {
        const url = import.meta.env.VITE_URL_BASE + "guests/update/" + guestId;
        const options = {
          mode: "cors",
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(body),
        };

        const { data, errors } = await fetchDataHelper(url, options);

        if (errors) {
          setError(errors);
        }

        if (data) {
          console.log(data);
          setIndex(2);
          return;
        }
      } catch (err) {
        console.log(err.message);
        setError([{ msg: err.message || "Unexpected error ocurred" }]);
      } finally {
        setLoading(false);
      }
    } else {
      setIndex(2);
    }
  }

  return (
    <form className={styles.mainForm} onSubmit={handleSubmit}>
      <label>
        First Name
        <input
          type="text"
          name="firstName"
          minLength={1}
          maxLength={100}
          value={guestFormData.firstName}
          onChange={handleInputChange}
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
          value={guestFormData.lastName}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Passport or ID number
        <input
          type="text"
          name="idNumber"
          minLength={1}
          maxLength={25}
          value={guestFormData.idNumber}
          onChange={handleInputChange}
        />
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
            defaultValue={email}
            disabled={true}
          />
        </label>
        <label>
          Phone Number
          <input
            type="text"
            name="phoneNumber"
            value={guestFormData.phoneNumber}
            onChange={handleInputChange}
          />
        </label>
      </fieldset>
      <fieldset>
        <legend>Address</legend>
        <label>
          City
          <input
            type="text"
            name="city"
            maxLength={50}
            value={guestFormData.city}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Street
          <input
            type="text"
            name="street"
            maxLength={100}
            value={guestFormData.street}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Postal Code
          <input
            type="text"
            name="postalCode"
            value={guestFormData.postalCode}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Country code
          <input
            type="text"
            name="countryCode"
            value={guestFormData.countryCode}
            onChange={handleInputChange}
          />
        </label>
      </fieldset>
      <menu className={styles.buttonContainer}>
        <button
          type="button"
          className={styles.resetBtn}
          onClick={() => setIndex(0)}
        >
          back
        </button>
        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? "Loading..." : "Continue"}
        </button>
      </menu>
      {error && <ErrorComponent errors={error} />}
    </form>
  );
}

GuestForm.propTypes = {
  setIndex: PropTypes.func.isRequired,
  guestData: PropTypes.object.isRequired,
  email: PropTypes.string.isRequired,
  guestId: PropTypes.string,
  setGuestId: PropTypes.func.isRequired,
};
