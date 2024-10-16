import PropTypes from "prop-types";
import styles from "../../styles/formDefaultStyle.module.css";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import fetchDataHelper from "../../utils/fetchDataHelper";
import ErrorComponent from "../error_page/ErrorComponent";

export default function ChangeReservationDatesAndGuests({
  id,
  data,
  refProps,
  setIsDialogOpen,
  setMessage,
  setStatus,
  refreshData,
}) {
  const [formData, setFormData] = useState({
    checkIn: "",
    checkOut: "",
    numberOfGuest: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setFormData({
      checkIn: format(data.check_in, "yyyy-MM-dd"),
      checkOut: format(data.check_out, "yyyy-MM-dd"),
      numberOfGuest: data.number_of_guest,
    });
  }, [data.check_in, data.check_out, data.number_of_guest]);

  function handleFormChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const body = {
        check_in: formData.checkIn,
        check_out: formData.checkOut,
        number_of_guest: formData.numberOfGuest,
      };
      const url =
        import.meta.env.VITE_URL_BASE + "reservations/update-dates-guest/" + id;
      const options = {
        mode: "cors",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body),
      };

      const { data, errors } = await fetchDataHelper(url, options);

      if (data) {
        console.log(data);
        setMessage("Reservation updated successfully");
        setStatus("ok");
        refProps?.current.close();
      }

      if (errors) {
        console.error(errors);
        setError(errors);
      }
    } catch (err) {
      console.error(err);
      setError([{ msg: err.message || "Unexpected error ocurred" }]);
    } finally {
      refreshData();
      setLoading(false);
    }
  }
  return (
    <form className={styles.mainForm} onSubmit={handleFormSubmit}>
      <fieldset>
        <legend>Dates</legend>
        <label>
          Check in
          <input
            type="date"
            name="checkIn"
            value={formData.checkIn}
            onChange={handleFormChange}
            required
            aria-required
          />
        </label>
        <label>
          Check out
          <input
            type="date"
            name="checkOut"
            value={formData.checkOut}
            onChange={handleFormChange}
            required
            aria-required
          />
        </label>
      </fieldset>
      <label>
        Number of guest
        <input
          type="number"
          name="numberOfGuest"
          value={formData.numberOfGuest}
          onChange={handleFormChange}
          required
          aria-required
        />
      </label>
      <menu className={styles.buttonContainer}>
        <button
          type="button"
          className={styles.resetBtn}
          disabled={loading}
          onClick={() => {
            setIsDialogOpen(false);
            refProps?.current.close();
          }}
        >
          Cancel
        </button>
        <button type="submit" className={styles.submitBtn} disabled={loading}>
          Submit
        </button>
      </menu>
      {error && <ErrorComponent errors={error} />}
    </form>
  );
}

ChangeReservationDatesAndGuests.propTypes = {
  data: PropTypes.object.isRequired,
  refProps: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  id: PropTypes.string.isRequired,
  setIsDialogOpen: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
  refreshData: PropTypes.func.isRequired,
};
