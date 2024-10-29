import { Link } from "react-router-dom";

export default function EmailValidationPage() {
  return (
    <div>
      <h1>Email Verified Successfully</h1>
      <p>
        Thank you for confirming your email! Your account is now active, and you
        can start using all of SimpleHostel&apos;s features.
      </p>
      <Link to="/app">Go to Dashboard</Link>
    </div>
  );
}
