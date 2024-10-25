import ContentTitle from "../../headers/ContentTitle";
import RatesAvailabilityCalendar from "./RatesAvailabilityCalendar";
import { UserProfileContext } from "../../../data_providers/UserProfileProvider";
import { useContext } from "react";

function RateAndAvailability() {
  const { userProfile } = useContext(UserProfileContext);

  if (!userProfile) {
    return <div>Loading...</div>;
  }
  const role = userProfile.user_info.role;
  return (
    <div className="main-content">
      <ContentTitle title={"Rates & Availability"} />
      <RatesAvailabilityCalendar role={role} />
    </div>
  );
}

export default RateAndAvailability;
