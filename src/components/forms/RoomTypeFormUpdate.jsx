import PropTypes from "prop-types";
import styles from "../../styles/formDefaultStyle.module.css";
import { useEffect, useState } from "react";
import fetchDataHelper from "../../utils/fetchDataHelper";
import ErrorComponent from "../error_page/ErrorComponent";

export default function RoomTypeFormUpdate({
  refProps,
  data,
  setIsDialogOpen,
  refreshRoomTypeData,
}) {
  const [formValues, setFormValues] = useState({
    description: "",
    base_rate: "",
    gender: "",
    currency: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const roomTypeId = data && data._id;

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
        refreshRoomTypeData();
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
    <form className={styles.mainForm} method="dialog" onSubmit={handleSubmit}>
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
      <fieldset>
        <legend>Gender</legend>
        <div className={styles.radioContainer}>
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
        <div className={styles.radioContainer}>
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
      <fieldset>
        <legend>Pricing Details</legend>
        <label className={styles.infoLabel}>
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
        </label>
        <label className={styles.infoLabel}>
          Currency
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
              Currency for the room
            </span>
          </span>
          <select
            name="currency"
            value={formValues?.currency}
            onChange={handleInputChange}
            required
            aria-required
          >
            <option value="">--Select a currency--</option>
            <option value="ARS">Argentine Peso</option>
            <option value="AUD">Australian Dollar</option>
            <option value="BOB">Bolivian Peso</option>
            <option value="BRL">Brazilian Real</option>
            <option value="CAD">Canadian Dollar</option>
            <option value="CLP">Chilean peso</option>
            <option value="COP">Colombian peso</option>
            <option value="EUR">Euro</option>
            <option value="MXN">Mexican peso</option>
            <option value="NZD">New Zealand Dollar</option>
            <option value="PEN">Nuevo Sol</option>
            <option value="PYG">Guarani</option>
            <option value="USD">US Dollar</option>
            <option value="UYU">Uruguayan peso</option>
          </select>
        </label>
      </fieldset>

      <menu className={styles.buttonContainer}>
        <button
          className={styles.resetBtn}
          type="reset"
          onClick={() => {
            setIsDialogOpen(false);
            refProps.current?.close();
          }}
        >
          Cancel
        </button>
        <button className={styles.submitBtn} type="submit">
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
  refreshRoomTypeData: PropTypes.func.isRequired,
};
