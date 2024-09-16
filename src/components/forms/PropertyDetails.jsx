import styles from "../../styles/formDefaultStyle.module.css";
import Error from "../error_page/Error";
import PropTypes from "prop-types";
import fetchDataHelper from "../../utils/fetchDataHelper";

function PropertyDetails({
  refProps,
  loading,
  setLoading,
  error,
  setError,
  refreshData,
  setRefreshData,
  formPropertyValues,
  setFormPropertyValues,
  handleCloseBtn,
}) {
  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormPropertyValues({
      ...formPropertyValues,
      [name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formBody = {
      propertyName: formPropertyValues.propertyName,
      ...(formPropertyValues.street && { street: formPropertyValues.street }),
      ...(formPropertyValues.city && { city: formPropertyValues.city }),
      ...(formPropertyValues.postalCode && {
        postalCode: formPropertyValues.postalCode,
      }),
      ...(formPropertyValues.countryCode && {
        countryCode: formPropertyValues.countryCode,
      }),
      ...(formPropertyValues.email && { email: formPropertyValues.email }),
      ...(formPropertyValues.phoneNumber && {
        phoneNumber: formPropertyValues.phoneNumber,
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
        setRefreshData(!refreshData);
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
        value={formPropertyValues.propertyName}
        onChange={handleInputChange}
        required
      />

      <label htmlFor="street">Street</label>
      <input
        type="text"
        name="street"
        id="street"
        maxLength={50}
        value={formPropertyValues.street}
        onChange={handleInputChange}
      />
      <label htmlFor="city">City</label>
      <input
        type="text"
        name="city"
        id="city"
        value={formPropertyValues.city}
        onChange={handleInputChange}
      />
      <label htmlFor="postalCode">Postal Code</label>
      <input
        type="text"
        name="postalCode"
        id="postalCode"
        value={formPropertyValues.postalCode}
        onChange={handleInputChange}
      />
      <label htmlFor="countryCode">Country code</label>
      <input
        type="text"
        name="countryCode"
        id="countryCode"
        value={formPropertyValues.countryCode}
        onChange={handleInputChange}
      />
      <fieldset>
        <legend>Contact info</legend>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          value={formPropertyValues.email}
          onChange={handleInputChange}
        />
        <label htmlFor="phoneNumber">Phone number</label>
        <input
          type="text"
          name="phoneNumber"
          id="phoneNumber"
          value={formPropertyValues.phoneNumber}
          onChange={handleInputChange}
        />
      </fieldset>
      <menu className={styles.buttonContainer}>
        <button
          type="reset"
          className={styles.resetBtn}
          onClick={() => {
            handleCloseBtn();
            refProps.current?.close();
          }}
        >
          Cancel
        </button>
        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? "Saving..." : "Save changes"}
        </button>
      </menu>
      {error && <Error errors={error} />}
    </form>
  );
}

PropertyDetails.propTypes = {
  refProps: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  loading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
  error: PropTypes.array,
  setError: PropTypes.func.isRequired,
  refreshData: PropTypes.bool.isRequired,
  setRefreshData: PropTypes.func.isRequired,
  formPropertyValues: PropTypes.object.isRequired,
  setFormPropertyValues: PropTypes.func.isRequired,
  handleCloseBtn: PropTypes.func.isRequired,
};

export default PropertyDetails;
