import PropTypes from "prop-types";

export default function Error({ errors }) {
  const listErrors = errors.map((error, index) => (
    <li key={index}>{error.msg}</li>
  ));
  return <ul>{listErrors}</ul>;
}

Error.propTypes = {
  errors: PropTypes.array.isRequired,
};
