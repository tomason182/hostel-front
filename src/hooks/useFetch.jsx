import { useState, useEffect } from "react";

export default function useFetch({ url, options }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(url, options)
      .then(async response => {
        if (response.status >= 400) {
          const errorMessage = await response.json();
          throw new Error(JSON.stringify(errorMessage));
        }
        return response.json();
      })
      .then(response => {
        setData(response);
      })
      .catch(error => setError(error))
      .finally(setLoading(false));
  }, []);

  return { data, error, loading };
}
