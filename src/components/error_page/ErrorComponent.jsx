import PropTypes from "prop-types";

export default function ErrorComponent({ errors }) {
  const listErrors = errors.map((error, index) => (
    <li key={index}>{error.msg}</li>
  ));
  return <ul className="errorMsg">{listErrors}</ul>;
}

ErrorComponent.propTypes = {
  errors: PropTypes.array.isRequired,
};
