import PropTypes from "prop-types";
import formDefault from "../../styles/formDefaultStyle.module.css";
import styles from "../../styles/RoomTypeForm.module.css";
import { useEffect, useState } from "react";

export default function RoomTypeFormUpdate({
  refProps,
  data,
  setIsDialogOpen,
}) {
  const [formValues, setFormValues] = useState({
    description: "",
    base_rate: "",
    type: "",
    gender: "",
  });

  useEffect(() => {
    setFormValues({
      description: data?.description || "",
      base_rate: data?.base_rate || "",
      type: data?.type || "",
      gender: data?.gender || "",
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
    setIsDialogOpen(false);
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
            <legend>Room Type selection: Dormitory or Private</legend>
            <div className={styles.radioInputContainer}>
              <label>
                Private
                <input
                  type="radio"
                  name="type"
                  value="private"
                  checked={formValues?.type === "private"}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className={styles.radioInputContainer}>
              <label>
                Dorm
                <input
                  type="radio"
                  name="type"
                  value="dorm"
                  checked={formValues?.type === "dorm"}
                  onChange={handleInputChange}
                />
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
          {data === null ? "Create" : "Update"}
        </button>
      </menu>
    </form>
  );
}

RoomTypeFormUpdate.propTypes = {
  refProps: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  data: PropTypes.object,
  setIsDialogOpen: PropTypes.func,
};
