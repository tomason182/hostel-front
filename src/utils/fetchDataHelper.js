export default async function fetchDataHelper(url, options) {
  let errors = [];
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorResponse = await response.json();
      Array.isArray(errorResponse)
        ? (errors = errorResponse)
        : errors.push({
            msg: errorResponse.message || "An error ocurred during request",
          });
      return { data: null, errors };
    }

    const data = await response.json();
    return { data, errors: null };
  } catch (err) {
    errors.push(err.message);
    return { data: null, errors };
  }
}
