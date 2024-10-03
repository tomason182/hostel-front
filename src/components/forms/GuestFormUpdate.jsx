import styles from "../../styles/formDefaultStyle.module.css";
import PropTypes from "prop-types";
import fetchDataHelper from "../../utils/fetchDataHelper";
import { useState } from "react";
import ErrorComponent from "../error_page/ErrorComponent";
import DialogHeader from "../dialogs/DialogHeader";

export default function GuestFormUpdate({
  guestData,
  propRef,
  setIsDialogOpen,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [guestFormData, SetGuestFormData] = useState({
    firstName: guestData?.first_name,
    lastName: guestData?.last_name,
    idNumber: guestData?.id_number,
    email: guestData.contact_info?.email,
    phoneNumber: guestData.contact_info?.phone_number,
    city: guestData.address?.city,
    street: guestData.address?.street,
    countryCode: guestData.address?.country_code,
    postalCode: guestData.address?.postal_code,
  });

  const handleInputChange = e => {
    const { name, value } = e.target;

    SetGuestFormData({
      ...guestFormData,
      [name]: value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

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

    try {
      if (!guestData._id) {
        throw new Error("no guest ID provided");
      }

      const guestId = guestData._id;

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

      if (data) {
        console.log(data);
        setIsDialogOpen(false);
        propRef?.current.close();
      }
      if (errors) {
        console.error(errors);
        setError(errors);
      }
    } catch (err) {
      console.error(err);
      setError([{ msg: err.message || "Unexpected error occurred" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DialogHeader
        title={"Update guest info"}
        propRef={propRef}
        setIsDialogOpen={setIsDialogOpen}
      />
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
              value={guestFormData.email}
              onChange={handleInputChange}
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
            onClick={() => {
              setIsDialogOpen(false);
              propRef?.current.close();
            }}
            disabled={loading}
          >
            Cancel
          </button>
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? "Loading..." : "Update"}
          </button>
        </menu>
        {error && <ErrorComponent errors={error} />}
      </form>
    </>
  );
}

GuestFormUpdate.propTypes = {
  guestData: PropTypes.object.isRequired,
  propRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  setIsDialogOpen: PropTypes.func.isRequired,
};
