import styles from "../../styles/HeaderLanding.module.css";
import isAuthenticated from "../../hooks/isAuthenticated";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function NavigationMenu() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    async function checkForAuth() {
      const response = await isAuthenticated();
      setIsAuth(response);
    }

    checkForAuth();
  }, []);

  return (
    <nav className={styles.nav} role="navigation">
      <Link to="/">Home</Link>
      <Link to="#">Pricing</Link>
      <Link to="/contact-us">Contact</Link>
      <Link to="#">About us</Link>
      {isAuth ? (
        <Link to="/app" className={styles.btnPrimary}>
          Go to app
        </Link>
      ) : (
        <>
          <Link to="/accounts/login"> Sign in</Link>
          <Link to="/accounts/signup" className={styles.btnPrimary}>
            Create Account
          </Link>
        </>
      )}
    </nav>
  );
}

export default NavigationMenu;
