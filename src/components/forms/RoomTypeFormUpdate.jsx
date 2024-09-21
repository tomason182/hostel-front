import PropTypes from "prop-types";
import formDefault from "../../styles/formDefaultStyle.module.css";
import styles from "../../styles/RoomTypeForm.module.css";
import { useEffect, useState } from "react";
import fetchDataHelper from "../../utils/fetchDataHelper";
import ErrorComponent from "../error_page/ErrorComponent";

export default function RoomTypeFormUpdate({
  refProps,
  data,
  setIsDialogOpen,
  isRoomTypeUpdated,
  setIsRoomTypeUpdated,
}) {
  const [formValues, setFormValues] = useState({
    description: "",
    base_rate: "",
    gender: "",
    currency: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const roomTypeId = data._id;

  useEffect(() => {
    setFormValues({
      description: data?.description || "",
      base_rate: data?.base_rate || "",
      gender: data?.gender || "",
      currency: data?.currency || "",
    });
  }, [data]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    /* 
    const roomTypeId = data._id; */

    try {
      const url =
        import.meta.env.VITE_URL_BASE + "room-types/update/" + roomTypeId;
      const options = {
        mode: "cors",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formValues),
      };

      const { data, errors } = await fetchDataHelper(url, options);

      if (data) {
        console.log(data);
        setIsRoomTypeUpdated(!isRoomTypeUpdated);
        setIsDialogOpen(false);
        refProps.current?.close();
      }

      if (errors) {
        setError(errors);
      }
    } catch (err) {
      console.error(err.message);
      setError([{ msg: err.message || "Unexpected error occurred" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      id={styles.form}
      className={formDefault.mainForm}
      method="dialog"
      onSubmit={handleSubmit}
    >
      <section>
        <label>
          Room type name:
          <input
            type="text"
            name="description"
            minLength={1}
            maxLength={100}
            value={formValues?.description}
            onChange={handleInputChange}
            required
            aria-required
          />
        </label>
        <div className={styles.flexContainer}>
          <fieldset>
            <legend>Gender</legend>
            <div className={styles.radioInputContainer}>
              <label>
                Mixed
                <input
                  type="radio"
                  name="gender"
                  value="mixed"
                  checked={formValues?.gender === "mixed"}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className={styles.radioInputContainer}>
              <label>
                Female
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formValues?.gender === "female"}
                  onChange={handleInputChange}
                />
              </label>
            </div>
          </fieldset>
        </div>
        <fieldset>
          <legend>Pricing Details</legend>
          <div className={styles.gridContainer}>
            <label htmlFor="base_rate" className={styles.labelContainer}>
              Base rate
              <span className={styles.tooltipContainer}>
                <svg
                  className={styles.infoIcon}
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-labelledby="base_rate"
                  role="img"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                <span id="base_rate" role="tooltip" className={styles.tooltip}>
                  Base rate per night and per guest
                </span>
              </span>
              <input
                type="number"
                name="base_rate"
                required
                min={1}
                max={1000}
                value={formValues?.base_rate}
                onChange={handleInputChange}
              />
              <label className={styles.labelContainer}>
                Currency
                <input
                  type="text"
                  name="currency"
                  required
                  min={1}
                  value={formValues?.currency}
                  onChange={handleInputChange}
                />
              </label>
            </label>
          </div>
        </fieldset>
      </section>
      <menu className={formDefault.buttonContainer}>
        <button
          className={formDefault.resetBtn}
          type="reset"
          onClick={() => {
            setIsDialogOpen(false);
            refProps.current?.close();
          }}
        >
          Cancel
        </button>
        <button className={formDefault.submitBtn} type="submit">
          {loading ? "Updating..." : "Update"}
        </button>
      </menu>
      {error && <ErrorComponent errors={error} />}
    </form>
  );
}

RoomTypeFormUpdate.propTypes = {
  refProps: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  data: PropTypes.object.isRequired,
  setIsDialogOpen: PropTypes.func.isRequired,
  setIsRoomTypeUpdated: PropTypes.func.isRequired,
  isRoomTypeUpdated: PropTypes.bool.isRequired,
};
