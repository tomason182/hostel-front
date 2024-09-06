import PropTypes from "prop-types";
import formDefault from "../../styles/formDefaultStyle.module.css";
import styles from "../../styles/RoomTypeForm.module.css";

export default function RoomTypeForm({ refProps }) {
  const handleSubmit = e => {
    e.preventDefault();
    // Handle form submission here

    // reset form
    e.target.reset();
  };

  return (
    <form
      id={styles.form}
      className={formDefault.mainForm}
      method="dialog"
      onSubmit={handleSubmit}
    >
      <section>
        <label htmlFor="description">Room type name:</label>
        <input
          type="text"
          id="description"
          name="description"
          minLength={3}
          maxLength={100}
          required
          aria-required
        />

        <div className={styles.flexContainer}>
          <fieldset>
            <legend>Room Type selection: Dormitory or Private</legend>
            <div className={styles.radioInputContainer}>
              <label htmlFor="private">Private</label>
              <input
                type="radio"
                id="private"
                name="type"
                value="private"
                defaultChecked
              />
            </div>
            <div className={styles.radioInputContainer}>
              <label htmlFor="dormitory">Dorm</label>
              <input
                type="radio"
                id="dormitory"
                name="type"
                value="dormitory"
              />
            </div>
          </fieldset>
          <fieldset>
            <legend>Gender</legend>
            <div className={styles.radioInputContainer}>
              <label htmlFor="private_bathroom">Mixed</label>
              <input
                type="radio"
                id="private_bathroom"
                name="bathroom"
                value="private"
                defaultChecked
              />
            </div>
            <div className={styles.radioInputContainer}>
              <label htmlFor="share_bathroom">Female</label>
              <input
                type="radio"
                id="share_bathroom"
                name="bathroom"
                value="share"
              />
            </div>
          </fieldset>
        </div>

        <fieldset>
          <legend>Room Capacity & Pricing Details</legend>
          <div className={styles.gridContainer}>
            <label htmlFor="max_occupancy" className={styles.labelContainer}>
              Max occupancy
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
            </label>
            <input type="number" id="max_occupancy" required min={1} max={20} />
            <label htmlFor="inventory" className={styles.labelContainer}>
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
            </label>
            <input type="number" id="inventory" required min={1} max={10} />
            <label htmlFor="base_rate" className={styles.labelContainer}>
              Base rate{" "}
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
            </label>
            <input
              type="number"
              id="base_rate"
              name="base_rate"
              required
              min={1}
              max={1000}
            />
          </div>
        </fieldset>
      </section>
      <menu className={formDefault.buttonContainer}>
        <button
          className={formDefault.resetBtn}
          type="reset"
          onClick={() => refProps.current?.close()}
        >
          Cancel
        </button>
        <button className={formDefault.submitBtn} type="submit">
          Save
        </button>
      </menu>
    </form>
  );
}

RoomTypeForm.propTypes = {
  refProps: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
};
