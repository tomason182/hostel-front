import { Link } from "react-router-dom";
import styles from "../../styles/SideBarMenu.module.css";
export default function SideBarMenu() {
  return (
    <nav className={styles.sidebarNav}>
      <button type="button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-labelledby="close-menu"
          aria-hidden="true"
          height={30}
          width={30}
          viewBox="0 0 30 30"
        >
          <title id="close-sidebar-menu">Close mobile menu</title>
          <path d="M7 7 L23 23 M7 23 L23 7"></path>
        </svg>
      </button>
      <Link to="#">Property</Link>
      <Link to="#">Rates & availability</Link>
      <Link to="#">Account</Link>
      <Link to="#">Log out</Link>
    </nav>
  );
}
