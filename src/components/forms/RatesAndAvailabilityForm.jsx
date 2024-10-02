import styles from "../../styles/formDefaultStyle.module.css";
import PropTypes from "prop-types";
import fetchDataHelper from "../../utils/fetchDataHelper";
import { useState } from "react";
import ErrorComponent from "../error_page/ErrorComponent";

export default function RatesAndAvailabilityForm({ roomTypeData, propRef }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const roomTypeList = roomTypeData.map(room => (
    <option key={room._id} value={room._id}>
      {room.description}
    </option>
  ));

  async function handleReservationSubmit(e) {
    e.preventDefault();

    const formData = {
      room_type_id: e.target.roomType.value,
      start_date: e.target.from.value,
      end_date: e.target.to.value,
      custom_rate: e.target.customRate.value,
      custom_availability: e.target.customAvailability.value,
    };

    console.log(formData);
  }

  return (
    <form
      method="dialog"
      className={styles.mainForm}
      onSubmit={handleReservationSubmit}
    >
      <label>
        Room selection
        <select name="roomType">{roomTypeList}</select>
      </label>
      <fieldset>
        <legend>Date range</legend>
        <label>
          Start date
          <input type="date" name="from" required aria-required />
        </label>
        <label>
          End date
          <input type="date" name="to" required aria-required />
        </label>
      </fieldset>
      <label>
        Rate
        <input type="number" name="customRate" required aria-required />
      </label>
      <label>
        Availability (Optional)
        <input type="number" name="customAvailability" />
      </label>
      <menu className={styles.buttonContainer}>
        <button
          type="reset"
          disabled={loading}
          onClick={() => propRef?.current.close()}
        >
          Cancel
        </button>
        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Submit"}
        </button>
      </menu>
      {error && <ErrorComponent errors={error} />}
    </form>
  );
}

RatesAndAvailabilityForm.propTypes = {
  roomTypeData: PropTypes.array.isRequired,
  propRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
};
