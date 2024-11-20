import styles from "../../styles/PricingContent.module.css";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function Pricing() {
  return (
    <>
      <Helmet>
        <title>Pricing | Simple Hostel</title>
        <meta
          name="description"
          content="Explore affordable pricing plans for SimpleHostel. Get started for free today!"
        />
      </Helmet>
      <div className={styles.mainContainer}>
        <h1>Pricing plans</h1>
        <h3>Flexible Pricing For Your Property Needs</h3>
        <div className={styles.planContainer}>
          <div className={styles.plan}>
            <p>Started Plan</p>
            <h1 className={styles.tier}>Free</h1>
            <div className={styles.priceContent}>
              <p className={styles.currency}>$</p>
              <p className={styles.amount}>0</p>
              <p className={styles.cost}>USD/month</p>
            </div>
            <button className={styles.getPlanBtn}>
              <Link to="/accounts/signup">Get Started for Free</Link>
            </button>
            <h3>SimpleHostel Free Plan Features</h3>
            <dl>
              <dt>Home Dashboard</dt>
              <dd>View today&apos;check-ins and check-outs</dd>
              <dd>Access to the last 10 reservations</dd>
              <dt>Reservation Calendar</dt>
              <dd>Display all upcoming reservations on a calendar</dd>
              <dd>Create and manage new reservations</dd>
              <dt>Rates & Availability Management</dt>
              <dd>Set custom rates and adjust property availability</dd>
              <dt>Reservations Management</dt>
              <dd>Search for reservations by date rage or guest name</dd>
              <dd>Edit reservation details and update guest information</dd>
              <dt>Property Settings</dt>
              <dd>Add property details, including location and contact info</dd>
              <dd>Invite up to 5 team members with designated roles</dd>
              <dd>
                Set up upto 25 beds for tracking availability and reservations
              </dd>
            </dl>
          </div>
          <div className={styles.plan}>
            <p className={styles.comingSoon}>Coming Soon</p>
            <h1 className={styles.tier}>Pro</h1>
            <div className={styles.priceContent}>
              <p className={styles.currency}>$</p>
              <p className={styles.amount}>TBD</p>
              <p className={styles.cost}>USD/month</p>
            </div>
            <button disabled className={styles.getPlanBtn}>
              Not Available Yet
            </button>
            <h3>Future Pro Plan Features</h3>
            <dl>
              <dt>Channel Manager Integration</dt>
              <dd>Connect with Booking.com and HostelWorld.com</dd>
              <dt>Advanced Property Management</dt>
              <dd>Manage account balance</dd>
              <dd>Send reservation confirmation by email to guest</dd>
              <dd>Send Emails to guest</dd>
              <dt>Priority Support</dt>
              <dd>Get priority access to our support team</dd>
            </dl>
          </div>
        </div>
      </div>
    </>
  );
}
