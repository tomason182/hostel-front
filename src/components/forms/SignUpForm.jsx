import styles from "../../styles/SignUpForm.module.css";

function SignUpForm() {
  return (
    <form className={styles.form}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="first_name"
        required
        aria-required
        minLength={2}
        maxLength={50}
      />
      <label htmlFor="property_name">Property name</label>
      <input
        type="text"
        id="property_name"
        name="property_name"
        required
        aria-required
        minLength={2}
        maxLength={100}
      />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="username"
        required
        aria-required
        minLength={5}
        maxLength={50}
      />
      <label htmlFor="psw">Password</label>
      <input
        type="password"
        id="psw"
        name="password"
        title="Must contain at least fourteen characters, four lower case letters, two upper case letters, two digits and two special characters"
        required
        aria-required
        minLength={14}
        pattern="(^(?=(?:.*\d){2,})(?=(?:.*[a-z]){4,})(?=(?:.*[A-Z]){2,})(?=(?:.*[\W_]){2,}).+$)"
      />
      <p className={styles.info}>
        <small>
          Password must contain at least 14 characters, 4 lower case letters,
          two upper case letters, two digits and two special characters
        </small>
      </p>
      <label htmlFor="psw_confirm">Password confirmation</label>
      <input
        type="password"
        id="psw_confirm"
        name="psw_confirm"
        required
        aria-required
      />
      <button className={styles.submitBtn} type="submit">
        Sign up
      </button>
    </form>
  );
}

export default SignUpForm;
