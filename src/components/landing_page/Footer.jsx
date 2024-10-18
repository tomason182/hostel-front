import styles from "../../styles/Footer.module.css";
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <h3>Simple Hostel</h3>
      <p>
        A simple, effective app designed to help small hostels manage
        reservations, rooms, and guests with ease.
      </p>
      <p> Simplify your operations and focus on what matters most.</p>
      <div className={styles.mainContent}>
        <div className={styles.container}>
          <h4>About us</h4>
          <ul>
            <li>About</li>
            <li>Team</li>
            <li>Services</li>
          </ul>
        </div>
        <div className={styles.container}>
          <h4>Support</h4>
          <ul>
            <li>FAQ</li>
            <li>Contact us</li>
          </ul>
        </div>
        <div className={styles.container}>
          <h4>Legal</h4>
          <ul>
            <li>Terms and Conditions</li>
            <li>Privacy</li>
          </ul>
        </div>
      </div>
      <div className={styles.subContent}>
        <p>© 2024 Simple Hostel. All rights reserved.</p>
      </div>
    </footer>
  );
}
