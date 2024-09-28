import styles from "../../styles/formDefaultStyle.module.css";
import PropTypes from "prop-types";
import fetchDataHelper from "../../utils/fetchDataHelper";
import ErrorComponent from "../../components/error_page/ErrorComponent";
import { useState } from "react";

export default function GuestEmailSearch({ refProps, setIndex, setGuestData }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleGuestSearch(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const email = e.target.email.value;
      const url = import.meta.env.VITE_URL_BASE + "guests/find?q=" + email;
      const options = {
        mode: "cors",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      };
      const { data, errors } = await fetchDataHelper(url, options);

      if (errors) {
        setError(errors);
        return;
      }

      if (data !== null) {
        setGuestData({
          _id: data._id,
          firstName: data.first_name || "",
          lastName: data.last_name || "",
          email: data.contact_info.email || "",
          idNumber: data.id_number || "",
          phoneNumber: data.contact_info.phone_number || "",
          city: data.address.city || "",
          street: data.address.street || "",
          countryCode: data.address.country_code || "",
          postalCode: data.address.postal_code || "",
        });
      } else {
        setGuestData({
          _id: null,
          firstName: "",
          lastName: "",
          email: email,
          idNumber: "",
          phoneNumber: "",
          city: "",
          street: "",
          countryCode: "",
          postalCode: "",
        });
      }
      setIndex(1);
      return;
    } catch (err) {
      console.error(err.message);
      setError([{ msg: err.message || "Unexpected error occurred" }]);
    } finally {
      setLoading(false);
    }
  }
  return (
    <form className={styles.mainForm} onSubmit={handleGuestSearch}>
      <label>
        Guest email
        <input type="email" name="email" required aria-required />
      </label>
      <menu className={styles.buttonContainer}>
        <button
          type="reset"
          className={styles.resetBtn}
          onClick={() => refProps?.current.close()}
        >
          Cancel
        </button>
        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? "Searching..." : "Continue"}
        </button>
      </menu>
      {error && <ErrorComponent errors={error} />}
    </form>
  );
}

GuestEmailSearch.propTypes = {
  refProps: PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    .isRequired,
  setIndex: PropTypes.func.isRequired,
  setGuestData: PropTypes.func.isRequired,
};
