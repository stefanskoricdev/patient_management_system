import styles from "./AddEditUserForm.module.scss";
import { useContext, useState } from "react";
import { sendData } from "../../../actions/actions";
import { useHistory, useRouteMatch } from "react-router-dom";
import AuthContext from "../../../../store/AuthProvider";
import FormInput from "../../../UI/Forms/FormInput/FormInput";
import validateForm from "../../../../helpers/validateForm";
import { AddUser, UpdatePassword } from "../../../actions/auth-actions";

const AddEditUserForm = () => {
  const {
    params: { id },
  } = useRouteMatch();

  let history = useHistory();

  const isAddMode = !id;

  const authCtx = useContext(AuthContext);
  const { setIsLoading, users, setUsers, usersCollection } = authCtx;

  let initialValues;
  let formInputs;
  if (!isAddMode && users.length > 0) {
    const patientToEdit = users.find((user) => user.id === id);
    initialValues = {
      firstName: patientToEdit.firstName,
      lastName: patientToEdit.lastName,
      email: patientToEdit.email,
      password: patientToEdit.password,
    };
    formInputs = [
      {
        label: "Password:",
        name: "password",
        type: "password",
      },
    ];
  } else {
    initialValues = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    };
    formInputs = [
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
  }

  const [inputValues, setInputValues] = useState(initialValues);

  const submitHandler = (e) => {
    e.preventDefault();

    const validate = validateForm(inputValues);
    if (!validate) return;

    const { firstName, lastName, email, password } = inputValues;
    if (!isAddMode) {
      UpdatePassword(password, setIsLoading, usersCollection, id, history, {
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password,
      });
      return;
    }
    AddUser(
      email,
      password,
      isAddMode,
      id,
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
    <form
      onSubmit={submitHandler}
      noValidate
      className={styles.AddEditUserForm}
    >
      <h2>{isAddMode ? "Add User" : "Update Password"}</h2>
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
      <button className={styles.SubmitBtn}>
        {isAddMode ? "Add" : "Update"}
      </button>
    </form>
  );
};

export default AddEditUserForm;
