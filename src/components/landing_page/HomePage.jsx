import styles from "../../styles/HomePage.module.css";
import calendarImage from "../../assets/image/calendar.png";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className={styles.mainContent}>
      <div className={styles.mainTitle}>
        <h1>
          Manage Your Hostel,<span>The Simple Way</span>
        </h1>
        <br />
        <p>
          Built for small hostels, our platform lets you effortlessly manage all
          your reservations in one place, saving you time and simplifying your
          life.
        </p>
        <br />
        <Link to="/accounts/signup">Sign up for free</Link>
      </div>
      <img
        src={calendarImage}
        alt="calendar-image"
        className={styles.calendarImg}
      />
      <div className={styles.mainDescription}>
        <div className={styles.descriptionTitle}>
          <h2>Simplifying Your Hostel&apos;s Daily Operations, Every Day.</h2>
          <p>
            &ldquo;<span>Simple Hostel</span> is the app I wish I had when
            managing my own hostel. With an intuitive, user-friendly design,
            we&apos;ve made it easier to simplify your hostel&apos;s daily
            management tasks—saving you time and reducing stress.&rdquo;
          </p>
        </div>
        <div className={styles.gridContainer}>
          <div className={styles.descriptionItem}>
            <h3>Why Choose Us?</h3>
            <p>
              Our platform is built specifically with small hostel owners in
              mind. We provide the tools you need without the complexity or cost
              of larger management systems, allowing you to focus on what
              matters most: your guests.
            </p>
          </div>
          <div className={styles.descriptionItem}>
            <h3>Who Is This App For?</h3>
            <p>
              Managing a small hostel can be challenging, and most management
              systems are too complicated and costly for small operations.
              <span>Simple Hostel</span> is designed specifically for small
              properties that need a simple, effective way to manage
              reservations, guests, and room availability.
            </p>
          </div>
          <div className={styles.descriptionItem}>
            <h3>What Can You Expect?</h3>
            <p>
              With <span>Simple Hostel</span>, you can easily organize your
              reservations, manage rates and availability for each room, access
              guest contact information, and create up to 5 user accounts to
              streamline your team&apos;s workflow.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
