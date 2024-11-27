import styles from "../../styles/formDefaultStyle.module.css";
import PropTypes from "prop-types";
import fetchDataHelper from "../../utils/fetchDataHelper";
import { useState } from "react";
import ErrorComponent from "../error_page/ErrorComponent";

export default function RatesAndAvailabilityForm({
  roomTypeData,
  propRef,
  refreshRoomTypeData,
}) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const roomTypeList = roomTypeData.map(room => (
    <option key={room._id} value={room._id}>
      {room.description}
    </option>
  ));

  async function handleReservationSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const roomTypeId = e.target.roomType.value;

    const formData = {
      start_date: e.target.from.value,
      end_date: e.target.to.value,
      custom_rate: e.target.customRate.value,
      ...(e.target.customAvailability.value && {
        custom_availability: e.target.customAvailability.value,
      }),
    };

    const url =
      import.meta.env.VITE_URL_BASE +
      "rates-and-availability/create/" +
      roomTypeId;
    const options = {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    };

    try {
      const { data, errors } = await fetchDataHelper(url, options);

      if (data) {
        refreshRoomTypeData();

        propRef?.current.close();

        return;
      }

      if (errors) {
        console.error(errors);
        setError(errors);
        return;
      }
    } catch (err) {
      console.error(err);
      setError([{ msg: err.message || "Unexpected error occurred" }]);
    } finally {
      setLoading(false);
    }
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
        <input
          type="number"
          step={0.01}
          name="customRate"
          required
          aria-required
        />
      </label>
      <label>
        Availability (Optional)
        <input
          type="number"
          name="customAvailability"
          disabled
          placeholder="NOT AVAILABLE YET"
        />
      </label>
      <menu className={styles.buttonContainer}>
        <button
          type="reset"
          className={styles.resetBtn}
          disabled={loading}
          onClick={() => propRef?.current.close()}
        >
          Cancel
        </button>
        <button className={styles.submitBtn} type="submit" disabled={loading}>
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
  refreshRoomTypeData: PropTypes.func.isRequired,
};
