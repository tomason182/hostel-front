import PropTypes from "prop-types";
import formDefault from "../../styles/formDefaultStyle.module.css";
import styles from "../../styles/RoomTypeForm.module.css";
import { useEffect, useState } from "react";

export default function RoomTypeForm({ refProps, data }) {
  const [formValues, setFormValues] = useState({
    description: "",
    max_occupancy: "",
    inventory: "",
    base_rate: "",
    type: "private",
    gender: "mixed",
  });

  useEffect(() => {
    setFormValues({
      description: data?.description || "",
      max_occupancy: data?.max_occupancy || "",
      inventory: data?.inventory || "",
      base_rate: data?.base_rate || "",
      type: data?.type || "private",
      gender: data?.gender || "mixed",
    });
  }, [data]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

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
          value={formValues?.description}
          onChange={handleInputChange}
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
                checked={formValues?.type === "private"}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.radioInputContainer}>
              <label htmlFor="dormitory">Dorm</label>
              <input
                type="radio"
                id="dormitory"
                name="type"
                value="dorm"
                checked={formValues?.type === "dorm"}
                onChange={handleInputChange}
              />
            </div>
          </fieldset>
          <fieldset>
            <legend>Gender</legend>
            <div className={styles.radioInputContainer}>
              <label htmlFor="mixed_dorm">Mixed</label>
              <input
                type="radio"
                id="mixed_dorm"
                name="gender"
                value="mixed"
                checked={formValues?.gender === "mixed"}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.radioInputContainer}>
              <label htmlFor="female_dorm">Female</label>
              <input
                type="radio"
                id="female_dorm"
                name="gender"
                value="female"
                checked={formValues?.gender === "female"}
                onChange={handleInputChange}
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
            <input
              type="number"
              id="max_occupancy"
              required
              min={1}
              max={20}
              value={formValues?.max_occupancy}
              onChange={handleInputChange}
            />
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
            <input
              type="number"
              id="inventory"
              required
              min={1}
              max={10}
              value={formValues?.inventory}
              onChange={handleInputChange}
            />
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
              value={formValues?.base_rate}
              onChange={handleInputChange}
            />
          </div>
        </fieldset>
      </section>
      <menu className={formDefault.buttonContainer}>
        <button
          className={formDefault.resetBtn}
          type="reset"
          onClick={() => {
            setFormValues(null);
            refProps.current?.close();
          }}
        >
          Cancel
        </button>
        <button className={formDefault.submitBtn} type="submit">
          {data === null ? "Create" : "Update"}
        </button>
      </menu>
    </form>
  );
}

RoomTypeForm.propTypes = {
  refProps: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  data: PropTypes.object,
};
