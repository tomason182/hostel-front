export default async function isAuthenticated() {
  const url = import.meta.env.VITE_URL_BASE + "/api/v1/users/validate";
  const options = {
    mode: "cors",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };

  try {
    const response = await fetch(url, options);

    if (response.status >= 400) {
      return false;
    }
    return true;
  } catch (err) {
    console.error("Error: ", err);
    return false;
  }
}
