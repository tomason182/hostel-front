import styles from "../../styles/ProfileEditForm.module.css";
import { UserProfileContext } from "../../data_providers/UserProfileProvider";
import { useContext, useEffect, useState } from "react";

export default function ProfileEditForm() {
  const { userProfile, refreshUserProfile } = useContext(UserProfileContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    function handleFormInitialValues() {
      setFormData({
        firstName: userProfile?.user_info.first_name
          ? userProfile.user_info.first_name
          : "",
        lastName: userProfile?.user_info.last_name
          ? userProfile.user_info.last_name
          : "",
        email: userProfile?.user_info.username
          ? userProfile.user_info.username
          : "",
        role: userProfile?.user_info.role ? userProfile.user_info.role : "",
      });
    }

    handleFormInitialValues();
  }, [userProfile]);
  console.log(formData);

  function handleFormChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  return (
    <>
      <h3>Profile</h3>
      <form className={styles.userEditForm}>
        <label>
          First Name
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleFormChange}
          />
        </label>
        <label>
          Last Name
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleFormChange}
          />
        </label>
        <label>
          Email
          <input
            type="email"
            name="email"
            disabled
            value={formData.email}
            onChange={handleFormChange}
          />
        </label>
        <label>
          Role
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleFormChange}
            disabled
          />
        </label>
        <button type="submit">Save</button>
      </form>
    </>
  );
}
