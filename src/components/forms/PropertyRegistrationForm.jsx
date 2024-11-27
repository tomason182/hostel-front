import styles from "../../styles/SignUpForm.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchDataHelper from "../../utils/fetchDataHelper";
import ErrorComponent from "../error_page/ErrorComponent";
import PropTypes from "prop-types";

export default function PropertyRegistrationForm({ token }) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    setErrors(null);
    setLoading(true);

    const propertyName = e.target.propertyName.value;

    const formBody = {
      token,
      propertyName,
    };

    console.log(formBody);

    try {
      const url = import.meta.env.VITE_URL_BASE + "users/auth/google/create";
      const options = {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formBody),
      };

      const { data, errors } = await fetchDataHelper(url, options);

      if (data) {
        console.log("user register successfully", data);

        // Voy a necesitar el token JWT para continuar
        navigate("/app");
      }

      if (errors) {
        console.log(errors);
        setErrors(errors);
      }
    } catch (e) {
      console.log("Error: ", e.message);
      setErrors([{ msg: e.message || "Unexpected error occurred" }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor="propertyName">Property name</label>
      <input
        type="text"
        id="propertyName"
        name="propertyName"
        required
        aria-required
        minLength={2}
        maxLength={100}
      />
      <button className={styles.submitBtn} type="submit" disabled={loading}>
        {loading ? "Signing up..." : "Continue"}
      </button>
      {errors && <ErrorComponent errors={errors} />}
    </form>
  );
}

PropertyRegistrationForm.propTypes = {
  token: PropTypes.string.isRequired,
};
