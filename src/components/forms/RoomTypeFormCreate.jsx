import stylesForm from "../../styles/formDefaultStyle.module.css";
import styles from "../..//styles/RoomTypeForm.module.css";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import fetchDataHelper from "../../utils/fetchDataHelper";
import ErrorComponent from "../error_page/ErrorComponent";

export default function RoomTypesFormCreate({
  refProps,
  setIsDialogOpen,
  isRoomTypeUpdated,
  setIsRoomTypeUpdated,
}) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    /*    const formBody = e.target;
    const formData = new FormData(formBody); */

    const {
      description,
      type,
      gender,
      max_occupancy,
      inventory,
      base_rate,
      currency,
    } = e.target;

    const formBody = {
      description: description.value,
      type: type.value,
      gender: gender.value,
      max_occupancy: max_occupancy.value,
      inventory: inventory.value,
      base_rate: base_rate.value,
      currency: currency.value,
    };

    try {
      const url = import.meta.env.VITE_URL_BASE + "room-types/create";
      const options = {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formBody),
      };

      const { data, errors } = await fetchDataHelper(url, options);

      if (data) {
        console.log(data);
        setIsRoomTypeUpdated(!isRoomTypeUpdated);
        setIsDialogOpen(false);
        refProps.current?.close();
        return;
      }

      if (errors) {
        setError(errors);
        return;
      }
    } catch (err) {
      setError([err.message || "Unexpected Error ocurred"]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    function handleEscKey(e) {
      if (e.keyCode === 27) {
        e.preventDefault();
        setIsDialogOpen(false);
        refProps.current?.close();
      }
    }
    window.addEventListener("keydown", handleEscKey);

    return () => window.removeEventListener("keydown", handleEscKey);
  }, [refProps, setIsDialogOpen]);

  return (
    <form
      id={styles.form}
      className={stylesForm.mainForm}
      method="dialog"
      onSubmit={handleSubmit}
    >
      <section>
        <label>
          Room type name
          <input
            type="text"
            name="description"
            minLength={1}
            maxLength={100}
            required
            aria-required
          />
        </label>
        <div className={styles.flexContainer}>
          <fieldset>
            <legend>Room type selection: Dormitory or Private</legend>
            <div className={styles.radioInputContainer}>
              <label>
                Private
                <input
                  type="radio"
                  name="type"
                  defaultValue="private"
                  defaultChecked
                />
              </label>
            </div>
            <div className={styles.radioInputContainer}>
              <label>
                Dormitory
                <input type="radio" name="type" defaultValue="dorm" />
              </label>
            </div>
          </fieldset>
          <fieldset>
            <legend>Gender</legend>
            <div className={styles.radioInputContainer}>
              <label>
                Mixed
                <input
                  type="radio"
                  name="gender"
                  defaultValue="mixed"
                  defaultChecked
                />
              </label>
            </div>
            <div className={styles.radioInputContainer}>
              <label>
                Female
                <input type="radio" name="gender" defaultValue="female" />
              </label>
            </div>
          </fieldset>
        </div>
        <fieldset>
          <legend>Room Capacity & Pricing Details</legend>
          <div className={styles.gridContainer}>
            <label className={styles.labelContainer}>
              MaxOccupancy
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
                  aria-describedby="maxOccupancyInfo"
                  role="img"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                <span
                  id="maxOccupancyInfo"
                  role="tooltip"
                  className={styles.tooltip}
                >
                  Maximum number of guests allowed in the room
                </span>
              </span>
              <input
                type="number"
                name="max_occupancy"
                required
                aria-required
                min={1}
                max={20}
              />
            </label>
            <label className={styles.labelContainer}>
              Inventory
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
                  aria-describedby="inventory"
                  role="img"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                <span id="inventory" role="tooltip" className={styles.tooltip}>
                  Number of room of the same type
                </span>
              </span>
              <input
                type="number"
                name="inventory"
                required
                aria-required
                min={1}
                max={50}
              />
            </label>
            <label className={styles.labelContainer}>
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
              <input type="number" name="base_rate" required min={1} />
            </label>
            <label className={styles.labelContainer}>
              Currency
              <input type="text" name="currency" required min={1} />
            </label>
          </div>
        </fieldset>
      </section>
      <menu className={stylesForm.buttonContainer}>
        <button
          className={stylesForm.resetBtn}
          type="reset"
          disabled={loading}
          onClick={() => {
            setIsDialogOpen(false);
            refProps.current?.close();
          }}
        >
          Cancel
        </button>
        <button
          className={stylesForm.submitBtn}
          type="submit"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </menu>
      {error && <ErrorComponent errors={error} />}
    </form>
  );
}

RoomTypesFormCreate.propTypes = {
  refProps: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  setIsDialogOpen: PropTypes.func.isRequired,
  isRoomTypeUpdated: PropTypes.bool.isRequired,
  setIsRoomTypeUpdated: PropTypes.func.isRequired,
};