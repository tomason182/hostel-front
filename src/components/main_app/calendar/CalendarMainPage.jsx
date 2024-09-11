import ContentTitle from "../../headers/ContentTitle";
import Calendar from "./Calendar";

function CalendarMainPage() {
  return (
    <div className="main-content">
      <ContentTitle title={"Calendar"} />
      <Calendar />
    </div>
  );
}

export default CalendarMainPage;
