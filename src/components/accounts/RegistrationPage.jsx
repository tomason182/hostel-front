import RegistrationHeading from "./RegistrationHeading";
import SignUpForm from "../forms/SignUpForm";
import GoogleSignIn from "./GoogleSignIn";

function RegistrationPage() {
  return (
    <>
      <RegistrationHeading />
      <GoogleSignIn />
      <SignUpForm />
    </>
  );
}

export default RegistrationPage;
