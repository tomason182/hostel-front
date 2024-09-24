import styles from "../../styles/formDefaultStyle.module.css";

export default function ReservationForm() {
  return (
    <form className={styles.mainForm}>
      <fieldset>
        <legend>Room type</legend>
        <label>
          Select a room
          <select name="roomType">
            <option value="room1">Room 1</option>
            <option value="room2">Room 2</option>
            <option value="room3">Room 3</option>
          </select>
        </label>
      </fieldset>
      <fieldset>
        <legend>Dates</legend>
        <label>
          Check in
          <input type="date" name="checkIn" required aria-required />
        </label>
        <label>
          Check out
          <input type="date" name="checkOut" required aria-required />
        </label>
      </fieldset>
      <fieldset>
        <legend>Reservation Details</legend>
        <label>
          Number of Guest
          <input type="number" name="numberOfGuest" required aria-required />
        </label>
        <label>
          Total Price
          <input type="number" name="totalPrice" required aria-required />
        </label>
        <label>
          Booking source
          <select name="bookingSource">
            <option value="booking">Booking.com</option>
            <option value="hostelWorld">HostelWorld.com</option>
            <option value="direct">Direct</option>
          </select>
        </label>
        <label>
          Reservation status
          <select name="reservationStatus">
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">cancelled</option>
            <option value="provisional">Provisional</option>
            <option value="no_show">No show</option>
          </select>
        </label>
        <label>
          Payment status
          <select name="paymentStatus">
            <option value="pending">Pending</option>
            <option value="canceled">Cancel</option>
            <option value="refunded">Refunded</option>
            <option value="paid">Paid</option>
            <option value="partial">Partial</option>
          </select>
        </label>
        <label>
          Special request
          <textarea name="specialRequest" rows={5} cols={50}></textarea>
        </label>
      </fieldset>
    </form>
  );
}
