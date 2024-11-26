import { useEffect } from "react";

export default function GoogleSignIn() {
  useEffect(() => {
    const idConfig = {
      client_id:
        "1042915186082-tc0g6bna870skossgv5trj7qbnp44l0b.apps.googleusercontent.com",
      callback: handleCredentialResponse,
      auto_select: false,
      ux_mode: "popup",
      auto_prompt: "false",
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
  });

  const handleCredentialResponse = response => {
    console.log("Google sign-in response: ", response.credential);
    // Send credential to the backend for verification
  };

  return <div id="google-signin-btn"></div>;
}
