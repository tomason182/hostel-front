import { property } from "../../../data_mocked";
import styles from "../../../styles/PropertyInfoSub.module.css";

export default function PropertyInfoSub() {
  return (
    <>
      <dl className={styles.dlist}>
        <dt>Property name</dt>
        <dd>{property.property_name}</dd>
        <dt>Address</dt>
        <dd>Street: {property.address.street}</dd>
        <dd>City: {property.address.city}</dd>
        <dd>Postal code: {property.address.postal_code}</dd>
        <dd>Country code: {property.address.country_code}</dd>
        <dt>Contact info</dt>
        <dd>Phone number: {property.contact_info.phone_number}</dd>
        <dd>email: {property.contact_info.email}</dd>
      </dl>
    </>
  );
}
