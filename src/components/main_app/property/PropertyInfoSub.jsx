import PropTypes from "prop-types";

export default function PropertyInfoSub({ propertyData }) {
  if (!propertyData) return <div>Loading...</div>;

  return (
    <>
      <dl>
        <dt>Property name</dt>
        <dd>{propertyData ? propertyData.propertyName : ""}</dd>
        <dt>Address</dt>
        <dd>Street: {propertyData ? propertyData.street : ""}</dd>
        <dd>City: {propertyData ? propertyData.city : ""}</dd>
        <dd>Postal code: {propertyData ? propertyData.postalCode : ""}</dd>
        <dd>Country code: {propertyData ? propertyData.countryCode : ""}</dd>
        <dt>Contact info</dt>
        <dd>Phone number: {propertyData ? propertyData.phoneNumber : ""}</dd>
        <dd>email: {propertyData ? propertyData.email : ""}</dd>
      </dl>
    </>
  );
}

PropertyInfoSub.propTypes = {
  propertyData: PropTypes.object.isRequired,
};
