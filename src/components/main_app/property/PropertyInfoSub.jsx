import styles from "../../../styles/PropertyInfoSub.module.css";
import PropTypes from "prop-types";

export default function PropertyInfoSub({ data, loading, error }) {
  if (loading) return <div>Loading...</div>;

  if (error) return <div>A network error was encountered</div>;

  return (
    <>
      <dl className={styles.dlist}>
        <dt>Property name</dt>
        <dd>{data ? data.property_name : ""}</dd>
        <dt>Address</dt>
        <dd>Street: {data ? data.address.street : ""}</dd>
        <dd>City: {data ? data.address.city : ""}</dd>
        <dd>Postal code: {data ? data.address.postal_code : ""}</dd>
        <dd>Country code: {data ? data.address.country_code : ""}</dd>
        <dt>Contact info</dt>
        <dd>Phone number: {data ? data.contact_info.phone_number : ""}</dd>
        <dd>email: {data ? data.contact_info.email : ""}</dd>
      </dl>
    </>
  );
}

PropertyInfoSub.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.object,
};
