import PropTypes from "prop-types";
import styles from "../../styles/ContentTitle.module.css";

export default function ContentTitle({ title }) {
  return (
    <>
      <h3 className={styles.dashboardTitles}>{title}</h3>
    </>
  );
}

ContentTitle.propTypes = {
  title: PropTypes.string,
};
