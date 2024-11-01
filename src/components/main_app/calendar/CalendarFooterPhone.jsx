import styles from "../../../styles/CalendarFooterPhone.module.css";
import CreateBtn from "../../buttons/BtnCreate";
import PropTypes from "prop-types";

export default function CalendarFooter({ dialogRef, setIsDialogOpen }) {
  return (
    <footer className={styles.footerContainer}>
      <CreateBtn
        title={"New reservation"}
        refProps={dialogRef}
        setIsDialogOpen={setIsDialogOpen}
      />
    </footer>
  );
}

CalendarFooter.propTypes = {
  dialogRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  setIsDialogOpen: PropTypes.func.isRequired,
};
