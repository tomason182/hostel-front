import Calendar from "./Calendar";
import CreateBtn from "../../buttons/BtnCreate";
import styles from "../../../styles/CalendarMainPage.module.css";

function CalendarMainPage() {
  return (
    <div className={styles.mainContent}>
      <CreateBtn title={"New reservation"} />
      <Calendar />
    </div>
  );
}

export default CalendarMainPage;
