import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div>
      <h1>Opss!...This page does not exist</h1>
      <Link to="/">Go back to the home page</Link>
    </div>
  );
}

export default ErrorPage;
