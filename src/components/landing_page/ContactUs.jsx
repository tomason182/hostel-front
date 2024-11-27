import styles from "../../styles/ContactUsContent.module.css";
import { Helmet } from "react-helmet-async";

export default function ContactUsContent() {
  return (
    <>
      <Helmet>
        <title>Contact us | Simple Hostel</title>
        <meta
          name="description"
          content="Need help with hostel management? Contact SimpleHostel for support or questions. We're here to assist you!"
        />
      </Helmet>
      <div className={styles.mainContainer}>
        <h1>Contact us</h1>
        <p>Have any questions or need assistance? Get in touch with us!</p>
        <div className={styles.contactContainer}>
          <h3>Email support</h3>
          <p>Send us an email and we&apos;get back to you soon</p>
          <address>support@simplehostel.net</address>
        </div>
      </div>
    </>
  );
}
