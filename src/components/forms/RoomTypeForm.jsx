import PropTypes from "prop-types";
import styles from "../../styles/RoomTypeForm.module.css";

export default function RoomTypeForm({ refProps }) {
  const handleSubmit = e => {
    e.preventDefault();
    // Handle form submission here

    // reset form
    e.target.reset();
  };

  return (
    <form className={styles.form} method="dialog" onSubmit={handleSubmit}>
      <section>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          minLength={3}
          maxLength={100}
          required
          aria-required
        />
        <fieldset>
          <legend>RoomType</legend>
          <div>
            <label htmlFor="private">Private room</label>
            <input
              type="radio"
              id="private"
              name="type"
              value="private"
              checked
            />
          </div>
          <div>
            <label htmlFor="dormitory">Dormitory</label>
            <input type="radio" id="dormitory" name="type" value="dormitory" />
          </div>
        </fieldset>
        <fieldset>
          <legend>Bathroom type</legend>
          <div>
            <label htmlFor="private_bathroom">Private bathroom</label>
            <input
              type="radio"
              id="private_bathroom"
              name="bathroom"
              value="private"
              checked
            />
          </div>
          <div>
            <label htmlFor="share_bathroom">Share bathroom</label>
            <input
              type="radio"
              id="share_bathroom"
              name="bathroom"
              value="share"
            />
          </div>
        </fieldset>
        <label htmlFor="max_occupancy">Max occupancy</label>
        <input type="number" id="max_occupancy" required min={1} max={20} />
        <label htmlFor="inventory">Inventory</label>
        <input type="number" id="inventory" required min={1} max={10} />
        <label htmlFor="base_rate">Base rate</label>
        <input
          type="number"
          id="base_rate"
          name="base_rate"
          required
          min={1}
          max={1000}
        />
      </section>
      <menu>
        <button type="reset" onClick={() => refProps.current?.close()}>
          Cancel
        </button>
        <button type="submit">Save</button>
      </menu>
    </form>
  );
}

RoomTypeForm.propTypes = {
  refProps: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
};
