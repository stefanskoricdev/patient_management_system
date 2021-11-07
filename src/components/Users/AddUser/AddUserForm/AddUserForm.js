import styles from "./AddUserForm.module.scss";
import { useContext, useState } from "react";
import { sendData } from "../../../actions/actions";
import { useHistory } from "react-router-dom";
import AuthContext from "../../../../store/AuthProvider";
import FormInput from "../../../UI/Forms/FormInput/FormInput";
import validateForm from "../../../../helpers/validateForm";
import { AddUser } from "../../../actions/auth-actions";

const AddUserForm = () => {
  let history = useHistory();

  const authCtx = useContext(AuthContext);
  const { setIsLoading, setUsers, usersCollection } = authCtx;

  const initialValues = {
    firstName: "",
    lastName: "",
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

  const submitHandler = (e) => {
    e.preventDefault();

    const validate = validateForm(inputValues);
    if (!validate) return;

    const { firstName, lastName, email, password } = inputValues;
    AddUser(
      email,
      password,
      firstName,
      lastName,
      sendData,
      setIsLoading,
      usersCollection,
      setUsers,
      history
    );
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
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
