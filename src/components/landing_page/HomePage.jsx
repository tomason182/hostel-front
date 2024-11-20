import styles from "../../styles/HomePage.module.css";
import calendarImage from "../../assets/image/calendar.png";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Hostel management | Simple Hostel</title>
        <meta
          name="description"
          content="Manage your hostel effortlessly with SimpleHostel. Streamline reservations, track availability, and enhance guest experiences. Get started for free today!"
        />
        <link
          rel="preload"
          href="/assets/fonts/inter/Inter_18pt-Medium.ttf"
          as="font"
          type="font/ttf"
          crossOrigin
        />
      </Helmet>
      <div className={styles.mainContent}>
        <div className={styles.mainTitle}>
          <h1 style={{ fontFamily: "'Inter', sans-serif" }}>
            Hostel Management
            <br />
            <span>The Simple Way</span>
          </h1>
          <br />
          <p>
            Built for small hostels, our platform lets you effortlessly manage
            all your reservations in one place, saving you time and simplifying
            your life.
          </p>
          <br />
          <Link to="/accounts/signup">Sign up for free</Link>
        </div>
        <img
          src={calendarImage}
          width="100%"
          height="auto"
          fetchPriority="high"
          alt="Calendar page with reservations in simple hostel dashboard"
          className={styles.calendarImg}
        />
        <div className={styles.mainDescription}>
          <h2>Simplifying Your Hostel&apos;s Daily Operations, Every Day.</h2>
          <p>
            &ldquo;<span>Simple Hostel</span> is the app I wish I had when
            managing my own hostel. With an intuitive, user-friendly design,
            we&apos;ve made it easier to simplify your hostel&apos;s daily
            management tasks—saving you time and reducing stress.&rdquo;
          </p>
        </div>
        <section className={styles.mainDescription}>
          <h2>Features of Our Hostel Management System</h2>
          <div className={styles.gridContainer}>
            <div className={styles.descriptionItem}>
              <h3>Manage your hostel booking with ease</h3>
              <p>
                Our intuitive calendar view allows you to see all your
                reservations at a glance, making it simple to track availability
                and occupancy. Effortlessly adjust rates, manage room types,
                update availability and handle seasonal pricing.
              </p>
            </div>
            <div className={styles.descriptionItem}>
              <h3>Reservation Management System</h3>
              <p>
                Easily search for reservations by date range or guest name.
                Modify reservation statuses—whether it&apos;s confirmed,
                canceled, or a no-show. Need to adjust details? Update stay
                dates or pricing to accommodate changes and keep your records
                accurate. Our system simplifies reservation management, giving
                you flexibility and efficiency.
              </p>
            </div>
            <div className={styles.descriptionItem}>
              <h3>Streamlined User Management with Role-Based Access</h3>
              <p>
                Grant access to your team while maintaining control over
                sensitive information. Our system allows you to add users with
                specific roles, such as managers or receptionists, with
                specifics permissions tailored to each role, ensuring that every
                user has access to the tools they need without compromising
                security.
              </p>
            </div>
          </div>
        </section>
        <section>
          <h2>Why SimpleHostel is the Perfect Choice for Your Hostel</h2>
          <div className={styles.gridContainer}>
            <div className={styles.descriptionItem}>
              <h3>Why Choose Us?</h3>
              <p>
                Our platform is built specifically with small hostel owners in
                mind. We provide the tools you need without the complexity or
                cost of larger management systems, allowing you to focus on what
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
                reservations, manage rates and availability for each room,
                access guest contact information, and create up to 5 user
                accounts to streamline your team&apos;s workflow.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
