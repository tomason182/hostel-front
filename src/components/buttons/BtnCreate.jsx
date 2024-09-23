import styles from "../../styles/CreateBtn.module.css";
import PropTypes from "prop-types";

export default function CreateBtn({ title, setIsDialogOpen, refProps }) {
  return (
    <button
      className={styles.btn}
      type="button"
      onClick={() => {
        setIsDialogOpen(true);
        refProps.current?.showModal();
      }}
    >
      {title}
    </button>
  );
}

CreateBtn.propTypes = {
  title: PropTypes.string.isRequired,
  setIsDialogOpen: PropTypes.func.isRequired,
  refProps: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
};
