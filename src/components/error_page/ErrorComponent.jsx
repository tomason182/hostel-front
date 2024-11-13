import PropTypes from "prop-types";
import styles from "../../styles/ErrorComponent.module.css";
export default function ErrorComponent({ errors }) {
  const listErrors = errors.map((error, index) => (
    <li key={index}>{error.msg}</li>
  ));
  return <ul className={styles.errorMessage}>{listErrors}</ul>;
}

ErrorComponent.propTypes = {
  errors: PropTypes.array.isRequired,
};
