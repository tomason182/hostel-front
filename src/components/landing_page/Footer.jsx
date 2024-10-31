import styles from "../../styles/Footer.module.css";
import { Link } from "react-router-dom";
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
            <li>
              <Link to="/about-us">About us</Link>
            </li>
            <li>Team</li>
          </ul>
        </div>
        <div className={styles.container}>
          <h4>Support</h4>
          <ul>
            <li>
              <Link to="/faq">FAQ</Link>
            </li>
            <li>
              <Link to="/contact-us">Contact us</Link>
            </li>
          </ul>
        </div>
        <div className={styles.container}>
          <h4>Legal</h4>
          <ul>
            <li>
              <Link to="/legal/terms-of-use">Terms and Conditions</Link>
            </li>
            <li>
              <Link to="/legal/privacy-policy">Privacy</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.subContent}>
        <p>© 2024 Simple Hostel. All rights reserved.</p>
      </div>
    </footer>
  );
}
