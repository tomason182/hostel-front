import PropTypes from "prop-types";
import styles from "../../../styles/GuestInfo.module.css";

export default function GuestInfo({ guestData }) {
  if (!guestData) return <div>Loading...</div>;

  return (
    <div className={styles.mainContainer}>
      <h3>Guest information</h3>
      <div className={styles.guestContent}>
        <div className={styles.guestInfoContainer}>
          <h4>{guestData.first_name + " " + guestData.last_name}</h4>
          <p>ID number: {guestData.id_number ? guestData.id_number : "N/A"}</p>
        </div>
        <div className={styles.contactInfoContainer}>
          <p>Contact info</p>
          <dl>
            <dt>Email</dt>
            <dd>
              {guestData.contact_info.email
                ? guestData.contact_info.email
                : "N/A"}
            </dd>
            <dt>Phone number</dt>
            <dd>
              {guestData.contact_info.phone_number
                ? guestData.contact_info.phone_number
                : "N/A"}
            </dd>
          </dl>
        </div>
        <div className={styles.addressContainer}>
          <p>Address</p>
          <dl>
            <dt>City</dt>
            <dd>{guestData.address.city ? guestData.address.city : "N/A"}</dd>
            <dt>Street</dt>
            <dd>
              {guestData.address.street ? guestData.address.street : "N/A"}
            </dd>
            <dt>Country code</dt>
            <dd>
              {guestData.address.country_code
                ? guestData.address.country_code
                : "N/A"}
            </dd>
            <dt>Postal code</dt>
            <dd>
              {guestData.address.postal_code
                ? guestData.address.postal_code
                : "N/A"}
            </dd>
          </dl>
        </div>
      </div>
    </div>
  );
}

GuestInfo.propTypes = {
  guestData: PropTypes.object.isRequired,
};
