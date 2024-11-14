import styles from "../../styles/ContactUsContent.module.css";

export default function ContactUsContent() {
  return (
    <div className={styles.mainContainer}>
      <h1>Contact us</h1>
      <p>Have any questions or need assistance? Get in touch with us!</p>
      <div className={styles.contactContainer}>
        <h3>Email support</h3>
        <p>Send us an email and we&apos;get back to you soon</p>
        <address>support@simplehostel.net</address>
      </div>
    </div>
  );
}
