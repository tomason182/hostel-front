import styles from "../../styles/SignUpForm.module.css";
import { useState, useEffect, useRef } from "react";
import fetchDataHelper from "../../utils/fetchDataHelper";
import ErrorComponent from "../error_page/ErrorComponent";
import { useNavigate, Link } from "react-router-dom";

function SignUpForm() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  // Reference to captcha
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

  async function handleSubmit(event) {
    event.preventDefault();
    setErrors(null);
    setLoading(true);

    // Check if the captcha was complete by verifying the token
    const token = window.grecaptcha.getResponse(captchaRef.current);
    if (!token) {
      alert("Please complete the CAPTCHA");
      return;
    }

    const { name, property_name, username, password, psw_confirm } =
      event.target;

    const formBody = {
      firstName: name.value,
      propertyName: property_name.value,
      username: username.value,
      password: password.value,
      acceptTerms: isTermsAccepted,
      captchaToken: token,
    };

    try {
      if (password.value !== psw_confirm.value) {
        throw new Error("Passwords don't match");
      }

      const url = import.meta.env.VITE_URL_BASE + "users/register";
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
        console.log("User register successfully", data);
        // Redirect user to email was send message
        localStorage.setItem("userEmail", formBody.username);
        const confirmEmailUrl = "/accounts/confirm-email/" + formBody.username;

        navigate(confirmEmailUrl);
      }

      if (errors) {
        setErrors(errors);
      }
    } catch (err) {
      setErrors([{ msg: err.message || "Unexpected error occurred" }]);
    } finally {
      setLoading(false);
      resetCaptcha();
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        required
        aria-required
        minLength={2}
        maxLength={50}
      />
      <label htmlFor="property_name">Property name</label>
      <input
        type="text"
        id="property_name"
        name="property_name"
        required
        aria-required
        minLength={2}
        maxLength={100}
      />
      <label htmlFor="username">Email</label>
      <input
        type="email"
        id="username"
        name="username"
        required
        aria-required
        aria-labelledby={errors ? "emailError" : null}
        minLength={5}
        maxLength={50}
      />
      <label htmlFor="psw">Password</label>
      <input
        type="password"
        id="psw"
        name="password"
        required
        aria-required
        aria-labelledby="psw_requirements"
        minLength={14}
        pattern="(^(?!.*\s)(?=(?:.*\d){2,})(?=(?:.*[a-z]){4,})(?=(?:.*[A-Z]){2,})(?=(?:.*[\W_]){2,}).+$)"
      />
      <label htmlFor="psw_confirm">Password confirmation</label>
      <input
        type="password"
        id="psw_confirm"
        name="psw_confirm"
        required
        aria-required
        aria-describedby={errors ? "passwordError" : null}
      />
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
      <p id="psw_requirements" className={styles.info}>
        <small>
          Password must contain at least 14 characters, 4 lower case letters,
          two upper case letters, two digits and two special characters
        </small>
      </p>
      <div id="recaptcha-container"></div>
      <button className={styles.submitBtn} type="submit" disabled={loading}>
        {loading ? "Signing up..." : "Sign up"}
      </button>
    </form>
  );
}

export default SignUpForm;
