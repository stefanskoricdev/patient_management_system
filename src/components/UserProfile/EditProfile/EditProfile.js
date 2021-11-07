import styles from "./EditProfile.module.scss";
import { useState, useRef, useContext, useEffect } from "react";
import { storage } from "../../../services/firebase";
import { updateData } from "../../actions/actions";
import { ErrorMessage } from "../../UI/Messages/Messages";
import defaultImg from "../../../assets/img/male_avatar.svg";
import FormInput from "../../UI/Forms/FormInput/FormInput";
import AuthContext from "../../../store/AuthProvider";
import validateForm from "../../../helpers/validateForm";

const EditProfile = () => {
  const authCtx = useContext(AuthContext);
  const {
    userId,
    setIsLoading,
    usersCollection,
    users,
    setUsers,
    profileImgUrl,
  } = authCtx;

  const storageRef = storage.ref();

  let initialValues = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    dob: "",
  };

  if (users && users.length > 0) {
    const targetedUser = users.find((user) => user.id === userId);
    initialValues = {
      firstName: targetedUser.firstName,
      lastName: targetedUser.lastName,
      phoneNumber: targetedUser.phoneNumber ? targetedUser.phoneNumber : "",
      dob: targetedUser.dob ? targetedUser.dob : "",
    };
  }

  const [value, setValue] = useState(initialValues);

  const fileInput = useRef();

  const editProfileHandler = (e) => {
    e.preventDefault();

    const { firstName, lastName, phoneNumber, dob } = value;

    const validate = validateForm(value);
    if (!validate) return;

    let updatedUser = {
      id: userId,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      dob: dob,
    };

    const targetedUserIndex = users.findIndex((user) => user.id === userId);
    const updatedUsersList = [...users];
    updatedUsersList[targetedUserIndex] = updatedUser;

    const fileRef = fileInput.current.files[0];

    if (fileRef) {
      const profileImgRef = storageRef.child(
        `profileImages/${userId}/${fileRef.name}`
      );

      profileImgRef
        .put(fileRef)
        .then((snapshot) => {
          snapshot.ref.getDownloadURL().then((url) => {
            updatedUser = {
              id: userId,
              firstName: firstName,
              lastName: lastName,
              phoneNumber: phoneNumber,
              dob: dob,
              profileImgUrl: url,
            };

            updateData(
              setIsLoading,
              usersCollection,
              userId,
              updatedUser,
              setUsers,
              updatedUsersList,
              ["displayName", "profileImg"],
              [updatedUser.firstName, url]
            );
          });
        })
        .catch((err) => ErrorMessage(err));
      return;
    }
    updateData(
      setIsLoading,
      usersCollection,
      userId,
      updatedUser,
      setUsers,
      updatedUsersList,
      ["displayName"],
      [updatedUser.firstName]
    );
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setValue((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  };

  const formInputs = [
    {
      label: "First name",
      name: "firstName",
      type: "text",
      value: value.firstName,
    },
    {
      label: "Last name",
      name: "lastName",
      type: "text",
      value: value.lastName,
    },
    {
      label: "Phone number",
      name: "phoneNumber",
      type: "phone",
      value: value.phoneNumber,
    },
    {
      label: "Date of birth",
      name: "dob",
      type: "date",
      value: value.dob,
    },
  ];

  return (
    <section className={styles.EditProfile}>
      <div className={styles.ProfileImg}>
        <img
          src={
            profileImgUrl === "undefined" || !profileImgUrl
              ? defaultImg
              : profileImgUrl
          }
          alt="userImg"
        />
      </div>
      <form onSubmit={editProfileHandler} className={styles.ProfileForm}>
        {formInputs.map((input) => (
          <FormInput
            key={input.name}
            label={input.label}
            name={input.name}
            type={input.type}
            value={input.value}
            onChange={onChangeHandler}
          />
        ))}
        <label className={styles.CustomFileInput}>
          Browse new profile image
          <input
            type="file"
            id="img"
            name="img"
            accept="image/*"
            ref={fileInput}
          />
        </label>

        <button>Update</button>
      </form>
    </section>
  );
};

export default EditProfile;
