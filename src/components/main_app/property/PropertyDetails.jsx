import styles from "../../../styles/propertyDetails.module.css";

function PropertyDetails() {
  const propertyDetails = {
    _id: "66ba803852508c4e121f1f5d",
    property_name: "The best hostel",
    address: {
      street: null,
      city: null,
      postal_code: null,
      country_code: null,
    },
    contact_info: {
      phone_number: null,
      email: null,
    },
    access_control: [
      {
        user_id: "66ba803852508c4e121f1f5c",
        role: "admin",
      },
      {
        user_id: "66ba8eab7300af884eff1a88",
        role: "employee",
      },
    ],
    createdAt: "2024-08-12T21:35:52.477Z",
    updatedAt: "2024-08-12T21:35:52.477Z",
  };

  const creationDate = propertyDetails.createdAt.split("T")[0];

  return (
    <div className={styles.mainContent}>
      <h2 className={styles.title}>Property details:</h2>
      <dl>
        <dt>Property name</dt>
        <dd>{propertyDetails.property_name}</dd>
        <dt>Address</dt>
        <dd>Street: {propertyDetails.address.street || "N/A"}</dd>
        <dd>City: {propertyDetails.address.street || "N/A"}</dd>
        <dd>Postal code: {propertyDetails.address.postal_code || "N/A"}</dd>
        <dd>Country code: {propertyDetails.address.country_code || "N/A"}</dd>
        <dt>Contact info</dt>
        <dd>
          Phone number: {propertyDetails.contact_info.phone_number || "N/A"}
        </dd>
        <dd>Email: {propertyDetails.contact_info.email || "N/A"}</dd>
        <dt>Created At</dt>
        <dd>{creationDate}</dd>
      </dl>
    </div>
  );
}

export default PropertyDetails;
