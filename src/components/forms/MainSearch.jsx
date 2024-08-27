import styles from "../../styles/MainSearch.module.css";

function MainSearch() {
  return (
    <form role="search" className={styles.searchForm}>
      <input
        type="search"
        id={styles.mainSearch}
        name="q"
        required
        minLength={2}
        maxLength={40}
        aria-label="Search reservations or guest information"
      />
      <button className={styles.searchBtn} type="submit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          className={styles.searchIcon}
          aria-label="Search bottom icon"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1={21} y1={21} x2={16.65} y2={16.65}></line>
        </svg>
      </button>
    </form>
  );
}

export default MainSearch;
