import { auth } from "../../services/firebase";
import {
  ErrorMessage,
  SuccessMessage,
  WarningMessage,
} from "../UI/Messages/Messages";
import { deleteData, updateData } from "./actions";
import firebase from "firebase/app";

export const AddUser = (
  email,
  password,
  firstName,
  lastName,
  sendData,
  setIsLoading,
  collection,
  setUsers,
  history
) => {
  setIsLoading(true);
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredentials) => {
      const newUser = {
        id: userCredentials.user.uid,
        firstName: firstName,
        lastName: lastName,
        email: email,
        dateCreated: firebase.firestore.FieldValue.serverTimestamp(),
        isAdmin: false,
        password: password,
      };
      sendData(setIsLoading, collection, newUser, setUsers);
      setIsLoading(false);
      history.push("/settings");
    })
    .catch((err) => {
      ErrorMessage(err);
      setIsLoading(false);
    });
};

export const DeleteUser = (
  setLoading,
  setState,
  collection,
  targetId,
  history,
  path
) => {
  WarningMessage(
    "Are you sure you want to delete data?",
    "You won't be able to revert this!"
  );
  setLoading(true);
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${process.env.REACT_APP_API_KEY}`;
  const token = localStorage.getItem("token");
  fetch(url, {
    method: "POST",
    body: JSON.stringify({
      idToken: token,
    }),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return res.json().then((data) => {
          let errorMessage;
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
            throw new Error(errorMessage);
          }
        });
      }
    })
    .then(() => {
      deleteData(setState, collection, targetId, history, path);
      setLoading(false);
      SuccessMessage("Deleted", "User has been deleted");
    })
    .catch((err) => ErrorMessage(err));
};

export const UpdatePassword = (
  newPassword,
  setLoading,
  collection,
  targetId,
  history,
  dataToUpdate
) => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_API_KEY}`;
  const token = localStorage.getItem("token");
  setLoading(true);
  fetch(url, {
    method: "POST",
    body: JSON.stringify({
      idToken: token,
      password: newPassword,
      returnSecureToken: false,
    }),
    headers: { "Content-Type": "aplication/json" },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return res.json().then((data) => {
          let errorMessage;
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
          }
          throw new Error(errorMessage);
        });
      }
    })
    .then((data) => {
      const newToken = data.idToken;
      localStorage.setItem("token", newToken);
      updateData(setLoading, collection, targetId, dataToUpdate);
      setLoading(false);
      SuccessMessage("Success", "User has been updated!");
      history.push("/settings");
    })
    .catch((err) => {
      setLoading(false);
      ErrorMessage(err);
    });
};
