import PropTypes from "prop-types";

export default function Error({ errors }) {
  console.log(errors);
  const listErrors = errors.map((error, index) => (
    <li key={index}>{error.msg}</li>
  ));
  return <ul className="errorMsg">{listErrors}</ul>;
}

Error.propTypes = {
  errors: PropTypes.array.isRequired,
};
