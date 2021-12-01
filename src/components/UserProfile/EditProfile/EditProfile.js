import styles from "./EditProfile.module.scss";
import { useState, useRef, useContext, useEffect } from "react";
import { storage } from "../../../services/firebase";
import { updateData } from "../../actions/actions";
import { ErrorMessage } from "../../UI/Messages/Messages";
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
    setProfileImgUrl,
    setDisplayName,
  } = authCtx;

  const storageRef = storage.ref();

  const [value, setValue] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    dob: "",
  });

  const fileInput = useRef();

  const editProfileHandler = (e) => {
    e.preventDefault();

    const { firstName, lastName, phoneNumber, dob, email } = value;

    const validate = validateForm(value);
    if (!validate) return;

    let updatedUser = {
      id: userId,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      email: email,
      dob: dob,
    };

    const targetedUserIndex = users.findIndex((user) => user.id === userId);
    const updatedUsersList = [...users];
    updatedUsersList[targetedUserIndex] = updatedUser;

    const fileRef = fileInput.current.files[0];
    // If there is a file inside file input send files to firebase storage.
    if (fileRef) {
      const profileImgsRef = storageRef.child(`profileImages/${userId}`);
      const imgRef = storageRef.child(
        `profileImages/${userId}/${fileRef.name}`
      );

      const addToStorage = () => {
        imgRef
          .put(fileRef)
          .then((snapshot) => {
            snapshot.ref
              .getDownloadURL()
              .then((url) => {
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
                return { displayName: updatedUser.firstName, imgUrl: url };
              })
              .then((data) => {
                setDisplayName(data.displayName);
                setProfileImgUrl(data.imgUrl);
              });
          })
          .catch((err) => ErrorMessage(err));
      };

      setIsLoading(true);

      //Check if user already has existing profile img.
      //If it has, delete it first and then add new one.
      profileImgsRef.listAll().then((res) => {
        const responseItems = res.items;
        const targetedUserImg = responseItems.find((item) => item.name);
        if (!!targetedUserImg) {
          const uidImgRef = storageRef.child(
            `/profileImages/${userId}/${targetedUserImg.name}`
          );
          uidImgRef
            .delete()
            .then(() => {
              addToStorage();
            })
            .catch((err) => {
              setIsLoading(false);
              ErrorMessage(err);
            });
        } else {
          addToStorage();
        }
      });
      return;
    }
    //If user didnt pick img file just update other data.
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
    setDisplayName(updatedUser.firstName);
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

  useEffect(() => {
    if (users && users.length > 0) {
      const targetedUser = users.find((user) => user.id === userId);
      const initialValues = {
        firstName: targetedUser.firstName,
        lastName: targetedUser.lastName,
        phoneNumber: targetedUser.phoneNumber ? targetedUser.phoneNumber : "",
        dob: targetedUser.dob ? targetedUser.dob : "",
        email: targetedUser.email,
      };
      setValue(initialValues);
    }
  }, [users, userId]);

  return (
    <section className={styles.EditProfile}>
      <div key="uniqueKey" className={styles.ProfileImg}>
        <img src={profileImgUrl} alt="userImg" />
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
