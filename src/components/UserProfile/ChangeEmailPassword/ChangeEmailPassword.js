import styles from "./ChangeEmailPassword.module.scss";
import { useState, useContext, useEffect } from "react";
import { ErrorMessage, WarningMessage } from "../../UI/Messages/Messages";
import { useHistory } from "react-router-dom";
import { updateData } from "../../actions/actions";
import FormInput from "../../UI/Forms/FormInput/FormInput";
import validateForm from "../../../helpers/validateForm";
import AuthContext from "../../../store/AuthProvider";

const ChangeEmailPassword = ({ data }) => {
  const authCtx = useContext(AuthContext);
  const { userId, usersCollection, users, setUsers, setIsLoading } = authCtx;

  const history = useHistory();

  const [inputValue, setInputValue] = useState({
    currentData: "",
    newData: "",
    confirmationData: "",
  });

  const [currentEmail, setCurrentEmail] = useState("");

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputValue((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const validate = validateForm(inputValue);
    if (!validate) return;
    if (data === "Email" && inputValue.currentData !== currentEmail) {
      WarningMessage(
        "Warning",
        `The old email you have entered is incorrect!`,
        false,
        "Go back"
      );
      return;
    }
    if (inputValue.newData !== inputValue.confirmationData) {
      WarningMessage(
        "Missmatch",
        `The new ${data.toLowerCase()} and confirmation ${data.toLowerCase()} do not match`,
        false,
        "Go back"
      );
      return;
    }
    const newData = inputValue.newData;
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_API_KEY}`;
    const token = localStorage.getItem("token");
    setIsLoading(true);
    fetch(url, {
      method: "POST",
      body:
        data === "Password"
          ? JSON.stringify({
              idToken: token,
              password: newData,
              returnSecureToken: true,
            })
          : JSON.stringify({
              idToken: token,
              email: newData,
              returnSecureToken: true,
            }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((errData) => {
            if (errData && errData.error && errData.error.message) {
              let errorMessage;
              if (
                errData.error.message === "INVALID_ID_TOKEN" ||
                errData.error.message === "TOKEN_EXPIRED" ||
                errData.error.message === "CREDENTIAL_TOO_OLD_LOGIN_AGAIN"
              ) {
                errorMessage =
                  "Your credential has expired. Please sign in again.";
              }
              if (errData.error.message === "EMAIL_EXISTS") {
                errorMessage =
                  "The email address is already in use by another account.";
              }
              throw new Error(errorMessage);
            }
          });
        }
      })
      .then((data) => {
        const targetedUserIndex = users.findIndex((user) => user.id === userId);
        const updatedUser = { ...users[targetedUserIndex], email: newData };
        const updatedUsersList = [...users];
        updatedUsersList[targetedUserIndex] = updatedUser;
        updateData(
          setIsLoading,
          usersCollection,
          userId,
          updatedUser,
          setUsers,
          updatedUsersList
        );

        localStorage.setItem("token", data.idToken);
        history.push("/profile");
      })
      .catch((err) => {
        setIsLoading(false);
        ErrorMessage(err);
      });
  };

  let formInputs = [
    {
      label: `Current ${data}`,
      type: "text",
      name: "currentData",
      value: inputValue.currentData,
    },
    {
      label: `New ${data}`,
      type: data === "Password" ? "password" : "text",
      name: "newData",
      value: inputValue.newData,
    },
    {
      label: `Confirm New ${data}`,
      type: data === "Password" ? "password" : "text",
      name: "confirmationData",
      value: inputValue.confirmationData,
    },
  ];
  //Omit CURRENT DATA input if user changes password!
  if (data === "Password") {
    const updatedFormInputs = formInputs.slice(1);
    formInputs = updatedFormInputs;
  }

  useEffect(() => {
    if (users && users.length > 0) {
      const targetedUser = users.find((user) => user.id === userId);
      const currentEmail = targetedUser.email;
      setCurrentEmail(currentEmail);
    }
  }, [users, userId]);

  return (
    <form onSubmit={submitHandler} className={styles.ChangeDataForm}>
      <h1>Change {data}</h1>
      {formInputs.map((input) => {
        return (
          <FormInput
            key={input.name}
            label={input.label}
            name={input.name}
            type={input.type}
            value={input.value}
            onChange={onChangeHandler}
          />
        );
      })}
      <button>Update {data}</button>
    </form>
  );
};

export default ChangeEmailPassword;
