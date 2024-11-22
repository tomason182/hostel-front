import styles from "../../styles/formDefaultStyle.module.css";
import PropTypes from "prop-types";
import fetchDataHelper from "../../utils/fetchDataHelper";
import { useEffect, useState } from "react";
import ErrorComponent from "../error_page/ErrorComponent";

export default function ReservationForm({
  guestData,
  roomTypeData,
  setIndex,
  propRef,
  fetchReservationData,
}) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [formValues, setFormValues] = useState({
    roomType: "",
    checkIn: "",
    checkOut: "",
    numberOfGuest: "",
  });

  useEffect(() => {
    function handleRoomCurrency() {
      const selectedRoomType = roomTypeData.find(
        r => r._id === formValues.roomType
      );

      if (selectedRoomType) {
        setCurrency(selectedRoomType.currency);
      }
    }

    handleRoomCurrency();
  }, [formValues.roomType, roomTypeData]);

  useEffect(() => {
    function handleTotalPrice() {
      let totalPrice = 0;
      if (
        formValues.roomType !== "" &&
        formValues.checkIn !== "" &&
        formValues.checkOut !== "" &&
        formValues.numberOfGuest !== ""
      ) {
        const selectedRoomType = roomTypeData.find(
          r => r._id === formValues.roomType
        );

        const totalNights =
          (new Date(formValues.checkOut) - new Date(formValues.checkIn)) /
          (1000 * 3600 * 24);
        console.log(totalNights);

        totalPrice =
          selectedRoomType.type === "dorm"
            ? totalNights *
              formValues.numberOfGuest *
              selectedRoomType.base_rate
            : totalNights * selectedRoomType.base_rate;
      }

      setTotalPrice(totalPrice);
    }

    handleTotalPrice();
  }, [
    formValues.roomType,
    formValues.checkIn,
    formValues.checkOut,
    formValues.numberOfGuest,
    roomTypeData,
  ]);

  const roomTypeList = roomTypeData.map(room => (
    <option key={room._id} value={room._id}>
      {room.description}
    </option>
  ));

  function handleFormValues(e) {
    e.preventDefault();

    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  }

  async function handleReservationSubmit(e) {
    e.preventDefault();

    const formData = {
      guest_id: guestData._id,
      room_type_id: e.target.roomType.value,
      check_in: e.target.checkIn.value,
      check_out: e.target.checkOut.value,
      number_of_guest: parseInt(e.target.numberOfGuest.value, 10),
      total_price: parseFloat(e.target.totalPrice.value),
      currency: e.target.currency.value,
      booking_source: e.target.bookingSource.value,
      reservation_status: e.target.reservationStatus.value,
      payment_status: e.target.paymentStatus.value,
      special_request: e.target.specialRequest.value,
    };

    try {
      setLoading(true);
      const url = import.meta.env.VITE_URL_BASE + "reservations/new";
      const options = {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      };

      const { data, errors } = await fetchDataHelper(url, options);

      if (errors) {
        console.error(errors);
        setError(errors);
        return;
      }

      if (data) {
        console.log(data);
        fetchReservationData();
        setIndex(0);
        propRef?.current.close();

        return;
      }
    } catch (err) {
      console.error(err.message);
      setError([{ msg: err.message || "Unexpected error Occurred" }]);
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
      <fieldset>
        <legend>Room type</legend>
        <label>
          Select a room
          <select
            name="roomType"
            required
            aria-required
            onChange={handleFormValues}
          >
            <option value="">--Please choose an option--</option>
            {roomTypeList}
          </select>
        </label>
      </fieldset>
      <fieldset>
        <legend>Dates</legend>
        <label>
          Check in
          <input
            type="date"
            name="checkIn"
            required
            aria-required
            onChange={handleFormValues}
          />
        </label>
        <label>
          Check out
          <input
            type="date"
            name="checkOut"
            required
            aria-required
            onChange={handleFormValues}
          />
        </label>
      </fieldset>
      <fieldset>
        <legend>Reservation Details</legend>
        <label>
          Number of Guest
          <input
            type="number"
            name="numberOfGuest"
            required
            aria-required
            onChange={handleFormValues}
          />
        </label>
        <label>
          Total Price (Estimated)
          <input
            type="number"
            name="totalPrice"
            required
            aria-required
            defaultValue={totalPrice}
          />
        </label>
        <label>
          Currency
          <input
            type="text"
            name="currency"
            required
            aria-required
            defaultValue={currency}
          />
        </label>
        <label>
          Booking source
          <select name="bookingSource">
            <option value="booking.com">Booking.com</option>
            <option value="hostelWorld.com">HostelWorld.com</option>
            <option value="direct">Direct</option>
          </select>
        </label>
        <label>
          Reservation status
          <select name="reservationStatus">
            <option value="confirmed">Confirmed</option>
            <option value="canceled">canceled</option>
            <option value="provisional">Provisional</option>
            <option value="no_show">No show</option>
          </select>
        </label>
        <label>
          Payment status
          <select name="paymentStatus">
            <option value="pending">Pending</option>
            <option value="canceled">Canceled</option>
            <option value="refunded">Refunded</option>
            <option value="paid">Paid</option>
            <option value="partial">Partial</option>
          </select>
        </label>
        <label>
          Special request
          <textarea name="specialRequest" rows={5} cols={45}></textarea>
        </label>
      </fieldset>
      <menu className={styles.buttonContainer}>
        <button
          type="button"
          className={styles.resetBtn}
          disabled={loading}
          onClick={() => setIndex(1)}
        >
          back
        </button>
        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? "Saving..." : "Submit"}
        </button>
      </menu>
      {error && <ErrorComponent errors={error} />}
    </form>
  );
}

ReservationForm.propTypes = {
  guestData: PropTypes.object.isRequired,
  roomTypeData: PropTypes.array.isRequired,
  setIndex: PropTypes.func.isRequired,
  propRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  fetchReservationData: PropTypes.func.isRequired,
};
