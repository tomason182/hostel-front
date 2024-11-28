import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function GoogleSignIn({ setUserData }) {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCredentialResponse = response => {
      console.log("Google sign-in response: ", response.credential);
      const token = response.credential;
      // Send credential to the backend for verification
      const url = import.meta.env.VITE_URL_BASE + "users/auth/google/signin";
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      };

      fetch(url, options)
        .then(response => {
          if (response.status === 200) {
            navigate("/app");
            return;
          }
          if (response.status === 409) {
            return setUserData({ msg: "need registration" });
          }
        })
        .catch(e => console.error("Error: ", e));
    };

    const idConfig = {
      client_id:
        "1042915186082-tc0g6bna870skossgv5trj7qbnp44l0b.apps.googleusercontent.com",
      callback: handleCredentialResponse,
      auto_select: false,
      ux_mode: "popup",
      auto_prompt: "false",
      use_fedcm_for_prompt: true,
    };

    if (window.google) {
      window.google.accounts.id.initialize(idConfig);
    }

    window.google.accounts.id.renderButton(
      document.getElementById("google-signin-btn"),
      {
        type: "icon",
        shape: "rectangular",
        theme: "outline",
        text: "signin_with",
        size: "large",
        locale: "en-US",
        logo_alignment: "left",
      }
    );
  }, []);

  return <div id="google-signin-btn"></div>;
}

GoogleSignIn.propTypes = {
  setUserData: PropTypes.func.isRequired,
};
