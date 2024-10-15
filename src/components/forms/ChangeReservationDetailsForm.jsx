import { useEffect, useState } from "react";
import styles from "../../styles/formDefaultStyle.module.css";
import PropTypes from "prop-types";
import fetchDataHelper from "../../utils/fetchDataHelper";
import ErrorComponent from "../error_page/ErrorComponent";

export default function ChangeReservationsDetailsForm({
  id,
  data,
  refProps,
  setIsDialogOpen,
  setMessage,
  setStatus,
  refreshData,
}) {
  const [formData, setFormData] = useState({
    reservationStatus: "",
    paymentStatus: "",
    price: "",
    currency: "",
    source: "",
    specialRequest: "",
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    setFormData({
      reservationStatus: data.reservation_status,
      paymentStatus: data.payment_status,
      price: data.total_price,
      currency: data.currency,
      source: data.booking_source,
      specialRequest: data.special_request,
    });
  }, [
    data.reservation_status,
    data.payment_status,
    data.total_price,
    data.currency,
    data.booking_source,
    data.special_request,
  ]);

  function handleFormChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const body = {
      reservation_status: formData.reservationStatus,
      payment_status: formData.paymentStatus,
      total_price: formData.price,
      currency: formData.currency,
      booking_source: formData.source,
      ...(formData.specialRequest && {
        special_request: formData.specialRequest,
      }),
    };

    const url = import.meta.env.VITE_URL_BASE + "reservations/update/" + id;
    const options = {
      mode: "cors",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body),
    };

    try {
      const { data, errors } = await fetchDataHelper(url, options);

      if (data) {
        setMessage("Reservation updated successfully");
        setStatus("ok");
        setIsDialogOpen(false);
        refreshData();
        refProps?.current.close();
        return;
      }

      if (errors) {
        setError(errors);
        return;
      }
    } catch (err) {
      setError({ msg: err.message || "Unexpected error ocurred" });
    }
  }

  return (
    <form className={styles.mainForm} onSubmit={handleSubmit}>
      <label>
        Reservation Status
        <select name="reservationStatus" onChange={handleFormChange}>
          <option
            value="confirmed"
            selected={formData.reservationStatus === "confirmed"}
          >
            Confirmed
          </option>
          <option
            value="provisional"
            selected={formData.reservationStatus === "provisional"}
          >
            Provisional
          </option>
          <option
            value="canceled"
            selected={formData.reservationStatus === "canceled"}
          >
            Canceled
          </option>
          <option
            value="no_show"
            selected={formData.reservationStatus === "no_show"}
          >
            No-show
          </option>
        </select>
      </label>
      <label>
        Payment Status
        <select name="paymentStatus" onChange={handleFormChange}>
          <option
            value="pending"
            selected={formData.paymentStatus === "pending"}
          >
            Pending
          </option>
          <option
            value="canceled"
            selected={formData.paymentStatus === "canceled"}
          >
            Canceled
          </option>
          <option
            value="refunded"
            selected={formData.paymentStatus === "refunded"}
          >
            Refunded
          </option>
          <option value="paid" selected={formData.paymentStatus === "paid"}>
            Paid
          </option>
          <option
            value="partial"
            selected={formData.paymentStatus === "partial"}
          >
            Partial
          </option>
        </select>
      </label>
      <fieldset>
        <legend>Price Details</legend>
        <label>
          Total price
          <input
            type="number"
            name="price"
            required
            aria-required
            value={formData.price}
            onChange={handleFormChange}
          />
        </label>
        <label>
          Currency
          <input
            type="text"
            name="currency"
            required
            aria-required
            value={formData.currency}
            onChange={handleFormChange}
          />
        </label>
      </fieldset>
      <label name="source">
        Booking source
        <select name="source" onChange={handleFormChange}>
          <option
            value="booking.com"
            selected={formData.source === "booking.com"}
          >
            Booking.com
          </option>
          <option
            value="hostelWorld.com"
            selected={formData.source === "hostelWorld.com"}
          >
            HostelWorld.com
          </option>
          <option value="direct" selected={formData.source === "direct"}>
            Direct reservation
          </option>
        </select>
      </label>
      <label>
        Special request
        <textarea
          name="specialRequest"
          rows={5}
          cols={33}
          maxLength={50}
          value={formData.specialRequest}
          onChange={handleFormChange}
        ></textarea>
      </label>
      <menu className={styles.buttonContainer}>
        <button
          type="button"
          className={styles.resetBtn}
          onClick={() => {
            setIsDialogOpen(false);
            refProps?.current.close();
          }}
        >
          Cancel
        </button>
        <button className={styles.submitBtn}>Save</button>
      </menu>
      {error && <ErrorComponent errors={error} />}
    </form>
  );
}

ChangeReservationsDetailsForm.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  refProps: PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    .isRequired,
  setIsDialogOpen: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
  refreshData: PropTypes.func.isRequired,
};
