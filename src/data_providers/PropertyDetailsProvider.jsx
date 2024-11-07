import { createContext, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";

const PropertyContext = createContext();

export default function PropertyDetailsProvider({ children }) {
  const [propertyData, setPropertyData] = useState(null);

  const fetchPropertyData = useCallback(() => {
    const url = import.meta.env.VITE_URL_BASE + "properties";
    const options = {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };
    fetch(url, options)
      .then(response => response.json())
      .then(data =>
        setPropertyData({
          propertyName: data.property_name,
          street: data.address.street,
          city: data.address.city,
          postalCode: data.address.postal_code,
          countryCode: data.address.country_code,
          phoneNumber: data.contact_info.phone_number,
          email: data.contact_info.email,
        })
      )
      .catch(err => console.err("Error fetching property data", err.message));
  }, []);

  useEffect(() => {
    fetchPropertyData();
  }, [fetchPropertyData]);

  return (
    <PropertyContext.Provider
      value={{ propertyData, refreshPropertyData: fetchPropertyData }}
    >
      {children}
    </PropertyContext.Provider>
  );
}

PropertyDetailsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { PropertyContext };
