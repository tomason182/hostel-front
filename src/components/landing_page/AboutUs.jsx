import styles from "../../styles/TermsContent.module.css";
import { Helmet } from "react-helmet";

export default function AboutUs() {
  return (
    <>
      <Helmet>
        <title>About us | Simple Hostel</title>
        <meta
          name="description"
          content="Learn more about SimpleHostel. Our mission is to simplify hostel management with intuitive tools and outstanding support. Meet the team behind the app!"
        />
      </Helmet>
      <div className={styles.termsContainer}>
        <h1>About Us</h1>
        <h4>Welcome to SimpleHostel!</h4>
        <p>
          SimpleHostel was born out of a desire to simplify hostel management,
          empowering hostel owners, administrator and staff to run their
          businesses efficiently and focus on what truly matters: creating an
          unforgettable experience for guests. With a user-friendly platform and
          a range of practical tools, SimpleHostel provides an intuitive way to
          handle reservations, room availability, property details, and more.
        </p>
        <h4>Our Mission</h4>
        <p>
          Our mission is to make hostel management simpler, faster, and mor
          accessible for everyone involved. We understand the unique needs of
          hostels and the importance of flexibility in managing reservations and
          resources. That&apos;s why SimpleHostel is designed to streamline
          daily operations, enhance productivity, and foster better
          decision-making for hostel-staff.
        </p>
        <h4>Why SimpleHostel?</h4>
        We believe that hostels owners deserve tools that make their work easier
        without unnecessary complexity or cost. That&apos;s why SimpleHostel
        offers a free, robust platform tailored to hostel management needs in
        its first stage.By focusing on the core essential -- reservations,
        calendar views, room and rate management, and user management --
        SimpleHostel provides exactly what you need to keep things running
        smoothly.
        <br />
        In the future, we look forwards to evolving with the need of our users.
        We plan to expand SimpleHostel&apos; features, offering additional
        integrations and services, such as connecting with popular booking
        platforms. Our growth will always be driven by the feedback and needs of
        our community.
        <h4>Our Commitment to You</h4>
        At SimpleHostel, we prioritize transparency, reliability, and
        responsiveness. We&apos;re here to support you every step of the way and
        welcome any questions, ideas, or feedback you may have.
        <br />
        Thank you for choosing SimpleHostel. We&apos;re excited to be part of
        your journey in creating memorable guest experiences!
      </div>
    </>
  );
}
