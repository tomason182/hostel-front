import { Link } from "react-router-dom";
import styles from "../../styles/TermsContent.module.css";
import { Helmet } from "react-helmet";

export default function Faq() {
  return (
    <>
      <Helmet>
        <title>FAQ | Simple Hostel</title>
        <meta
          name="description"
          content="Find answers to common questions about SimpleHostel. Learn how to manage reservations, use features, and get support quickly."
        />
      </Helmet>
      <div className={styles.termsContainer}>
        <h1>Frequently Asked Questions</h1>
        <h4>1. What is SimpleHostel?</h4>
        <p>
          SimpleHostel is a streamlined hostel management platform designed for
          hostel owners, administrators, and staff. It helps you handle
          reservations, manage room availability, view property details, set
          rates, and simplify daily operations.
        </p>
        <h4>2. How much does SimpleHostel cost?</h4>
        <p>
          SimpleHostel is currently offered as a free service in its first
          stage. This allows you to access essential hostel management tools at
          no cost. In future updates, we may introduce additional paid features,
          such as integrations with booking channels like Booking.com and
          Hostelworld.
        </p>
        <h4>3. Can I manage multiple properties with SimpleHostel?</h4>
        <p>
          At this stage, SimpleHostel is primarily designed for single-property
          management. We plan to expand our features based on user feedback, and
          multi-property support may be considered in future versions.
        </p>
        <h4>4. How do I sign up?</h4>
        <p>
          To sign up, simply go to the{" "}
          <Link className={styles.links} to="/accounts/signup">
            Sign Up
          </Link>{" "}
          page, fill out the required details, and create your account. Once
          registered, you&apos;ll gain access to SimpleHostel&apos;s management
          tools.
        </p>
        <h4>5. Is my data secure?</h4>
        <p>
          Yes, SimpleHostel takes data security seriously. We implement standard
          industry practices to protect your information and regularly update
          our security measures. Please review our{" "}
          <Link className={styles.links} to="/legal/privacy-policy">
            Privacy Policy
          </Link>{" "}
          for more details.
        </p>
        <h4>6. Can I access SimpleHostel on my mobile device?</h4>
        <p>
          Yes, SimpleHostel is designed to work on both desktop and mobile
          devices, allowing you to manage your hostel conveniently from anywhere
          with internet access.
        </p>
        <h4>7. What if I need help with my account?</h4>
        <p>
          If you need assistance, our support team is here to help. Please reach
          out to us at{" "}
          <span className={styles.links}>support@simplehostel.net</span>, and
          we&apos;ll be happy to assist you with any account issues or
          questions.
        </p>
        <h4>8. How do I delete my account?</h4>
        <p>
          To delete your account, please contact us at{" "}
          <span className={styles.links}>support@simplehostel.net</span>
          with your account details, and we&apos;ll guide you through the
          process. For more information, review the Your Data Rights section in
          our{" "}
          <Link className={styles.links} to="/legal/privacy-policy">
            Privacy Policy
          </Link>
          .
        </p>
        <h4>9. Will SimpleHostel be adding mor features?</h4>
        <p>
          Yes! We are continually working to improve SimpleHostel and will be
          adding new features based on user feedback. Our next planned phase
          includes integrations with popular booking platforms to streamline
          your reservations even further.
        </p>
        <h4>How can I provide feedback?</h4>
        <p>
          We welcome your feedback! Please share your suggestions and ideas with
          us at <span className={styles.links}>support@simplehostel.net</span>,
          as they help us make SimpleHostel better for you.
        </p>
      </div>
    </>
  );
}
