import styles from "./AddUserForm.module.scss";
import { useContext, useState } from "react";
import { sendData } from "../../../actions/actions";
import { useHistory } from "react-router-dom";
import { AddUser } from "../../../actions/auth-actions";
import AuthContext from "../../../../store/AuthProvider";
import FormInput from "../../../UI/Forms/FormInput/FormInput";
import validateForm from "../../../../helpers/validateForm";

const DEFAULT_PROFILE_IMG_URL =
  "https://firebasestorage.googleapis.com/v0/b/dmf-patient-management-d003a.appspot.com/o/user-circle-solid-240.png?alt=media&token=43ff9eff-b670-49c5-a93a-74582edc6719";

const AddUserForm = () => {
  let history = useHistory();

  const authCtx = useContext(AuthContext);
  const { setIsLoading, setUsers, usersCollection } = authCtx;

  const initialValues = {
    firstName: "",
    lastName: "",
    gender: "male",
    email: "",
    password: "",
  };
  const formInputs = [
    {
      label: "First Name:",
      name: "firstName",
      type: "text",
    },
    {
      label: "Last Name:",
      name: "lastName",
      type: "text",
    },
    { label: "Email:", name: "email", type: "email" },
    {
      label: "Password:",
      name: "password",
      type: "password",
    },
  ];

  const [inputValues, setInputValues] = useState(initialValues);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const validate = validateForm(inputValues);
    if (!validate) return;

    const { firstName, lastName, email, password } = inputValues;

    let newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      profileImgUrl: DEFAULT_PROFILE_IMG_URL,
    };

    AddUser(
      newUser,
      sendData,
      setIsLoading,
      usersCollection,
      setUsers,
      history
    );
  };

  return (
    <form onSubmit={submitHandler} noValidate className={styles.AddUserForm}>
      <h2>Add user</h2>
      <section>
        {formInputs.map((input) => {
          const { label, name, type } = input;
          return (
            <FormInput
              key={name}
              label={label}
              name={name}
              type={type}
              value={inputValues[name]}
              onChange={onChangeHandler}
            />
          );
        })}
      </section>
      <button className={styles.SubmitBtn}>Add</button>
    </form>
  );
};

export default AddUserForm;
