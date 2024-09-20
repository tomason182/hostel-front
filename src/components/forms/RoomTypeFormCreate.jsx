import stylesForm from "../../styles/formDefaultStyle.module.css";
import styles from "../..//styles/RoomTypeForm.module.css";
import PropTypes from "prop-types";

export default function RoomTypesFormCreate({ refProps }) {
  return (
    <form id={styles.form} className={stylesForm.mainForm} method="dialog">
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
          </div>
        </fieldset>
      </section>
      <menu className={stylesForm.buttonContainer}>
        <button
          className={stylesForm.resetBtn}
          type="reset"
          onClick={() => refProps.current?.close()}
        >
          Cancel
        </button>
        <button className={stylesForm.submitBtn} type="submit">
          Create
        </button>
      </menu>
    </form>
  );
}

RoomTypesFormCreate.propTypes = {
  refProps: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
};
