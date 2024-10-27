import styles from "../../styles/PricingContent.module.css";

export default function PricingContent() {
  return (
    <div className={styles.mainContainer}>
      <h1>Pricing plans</h1>
      <h3>Flexible Pricing For Your Property Needs</h3>
      <div className={styles.planContainer}>
        <div className={styles.plan}>
          <p>Started Plan</p>
          <h1 className={styles.cost}>Free</h1>
          <button>Get Started for Free</button>
          <p>What can you do in the free plan?</p>
          <ul>
            <li>Add reservations & guest info</li>
            <li>Get reservations display on Calendar</li>
            <li>Information of who&apos;s coming and leaving today</li>
            <li>Search for reservations and guest</li>
            <li>Add up to 5 user account with roles</li>
            <li>Manage up to 25 beds</li>
          </ul>
        </div>
        <div className={styles.plan}>
          <h1 className={styles.cost}>Free</h1>
          <p>Started Plan</p>
          <button>Get Started for Free</button>
        </div>
        <div className={styles.plan}>
          <h1 className={styles.cost}>Free</h1>
          <p>Started Plan</p>
          <button>Get Started for Free</button>
        </div>
      </div>
    </div>
  );
}
