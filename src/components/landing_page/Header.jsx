import { Link } from "react-router-dom";
import styles from "../../styles/HeaderLanding.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <h3>Hostel App Logo</h3>
        <nav className={styles.nav}>
          <Link to="#">Home</Link>
          <Link to="#">Services</Link>
          <Link to="#">Pricing</Link>
          <Link to="#">Contact</Link>
          <Link to="#">About us</Link>
        </nav>
      </div>
      <div className={styles.btn}>
        <button>
          <Link to="#">Sign Up</Link>
        </button>
        <button>
          <Link to="#">Sign Up</Link>
        </button>
      </div>
    </header>
  );
}

export default Header;
