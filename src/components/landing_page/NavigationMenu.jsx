import styles from "../../styles/HeaderLanding.module.css";
import { Link } from "react-router-dom";

function NavigationMenu() {
  return (
    <nav className={styles.nav} role="navigation">
      <Link to="/">Home</Link>
      <Link to="#">Services</Link>
      <Link to="#">Pricing</Link>
      <Link to="#">Contact</Link>
      <Link to="#">About us</Link>
      <Link to="#"> Sign in</Link>
      <Link to="/accounts/signup" className={styles.btnPrimary}>
        Create Account
      </Link>
    </nav>
  );
}

export default NavigationMenu;
