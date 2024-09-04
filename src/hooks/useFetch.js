import { useState, useEffect } from "react";

export default function useFetch({ url, options }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (url && options !== null) {
      setLoading(true);
      setError(null);

      fetch(url, options)
        .then(response => {
          if (response.status >= 400) {
            throw new Error(`Server error: ${response.status}`);
          }
          return response.json();
        })
        .then(response => setData(response))
        .catch(error => setError(error))
        .finally(setLoading(false));
    }
  }, [url, options]);

  return { data, error, loading };
}
