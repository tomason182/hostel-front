import ContentTitle from "../../headers/ContentTitle";
import RatesAvailabilityCalendar from "./RatesAvailabilityCalendar";

function RateAndAvailability() {
  return (
    <div className="main-content">
      <ContentTitle title={"Rates & Availability"} />
      <RatesAvailabilityCalendar />
    </div>
  );
}

export default RateAndAvailability;
