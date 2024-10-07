import styles from "../../../styles/CalendarFooter.module.css";
import CreateBtn from "../../buttons/BtnCreate";
import PropTypes from "prop-types";

export default function CalendarFooter({ dialogRef, setIsDialogOpen }) {
  return (
    <footer className={styles.footerContainer}>
      <ul>
        <li className={styles.provisional}>Reserved-Provisional</li>
        <li className={styles.confirmed}>Reserved-Confirmed</li>
        <li className={styles.inHouse}>In House</li>
        <li className={styles.checkedOut}>Checked-out</li>
      </ul>

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
