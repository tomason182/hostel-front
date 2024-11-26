import styles from "../../styles/SignUpForm.module.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import fetchDataHelper from "../../utils/fetchDataHelper";
import ErrorComponent from "../error_page/ErrorComponent";
import PropTypes from "prop-types";

export default function PropertyRegistrationForm({ token }) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  const captchaRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Render the reCAPTCHA widget after component mounts
    if (window.grecaptcha) {
      window.grecaptcha.ready(() => {
        captchaRef.current = window.grecaptcha.render("recaptcha-container", {
          sitekey: import.meta.env.VITE_SITE_PUBLIC_KEY,
          callback: onloadCallback,
        });
      });
    } else {
      console.error("reCAPTCHA script not loaded");
    }
  }, []);

  function resetCaptcha() {
    if (captchaRef !== null) {
      window.grecaptcha.reset(captchaRef.current);
    }
  }

  function onloadCallback(token) {
    console.log("Captcha token: ", token);
  }

  function handleAcceptTerms(e) {
    setIsTermsAccepted(e.target.checked);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors(null);
    setLoading(true);

    // Verify the captcha token
    const captchaToken = window.grecaptcha.getResponse(captchaRef);
    if (!captchaToken) {
      alert("Please complete the CAPTCHA");
      return;
    }

    const propertyName = e.target.value;

    const formBody = {
      token,
      propertyName,
      acceptTerms: isTermsAccepted,
      captchaToken,
    };

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
        setErrors(errors);
      }
    } catch (e) {
      setErrors([{ msg: e.message || "Unexpected error occurred" }]);
    } finally {
      setLoading(false);
      resetCaptcha();
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>
        Property name
        <input
          type="text"
          name="propertyName"
          required
          aria-required
          minLength={2}
          maxLength={100}
        />
      </label>
      <label className={styles.checkboxLabel}>
        <input
          type="checkbox"
          name="accept_terms"
          checked={isTermsAccepted}
          onChange={handleAcceptTerms}
          required
          aria-required
        />{" "}
        I accept the <Link to="/legal/terms-of-use">Terms and Conditions</Link>{" "}
        and <Link to="/legal/privacy-policy">Privacy Policy</Link>
      </label>
      {errors && <ErrorComponent errors={errors} />}
      <div id="recaptcha-container"></div>
      <button className={styles.submitBtn} type="submit" disabled={loading}>
        {loading ? "Signing up..." : "Submit"}
      </button>
    </form>
  );
}

PropertyRegistrationForm.propTypes = {
  token: PropTypes.string.isRequired,
};
