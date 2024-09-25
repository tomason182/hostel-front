export default async function fetchDataHelper(url, options) {
  let errors = [];
  try {
    const response = await fetch(url, options);
    console.log(response);

    if (!response.ok) {
      const errorResponse = await response.json();
      /* console.log(errorResponse); */
      Array.isArray(errorResponse)
        ? (errors = errorResponse)
        : errors.push({
            msg: errorResponse.msg || "An error ocurred during request",
          });
      return { data: null, errors };
    }

    const data = await response.json();
    return { data, errors: null };
  } catch (err) {
    errors.push({ msg: err.message });
    return { data: null, errors };
  }
}
