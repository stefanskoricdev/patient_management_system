import styles from "./AddUserForm.module.scss";
import { useRef, useContext } from "react";
import { auth } from "../../../../services/firebase";
import { sendData } from "../../../actions/actions";
import AppContext from "../../../../store/AppProvider";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";

const mySwal = withReactContent(Swal);

const AddUserForm = () => {
  let firstNameRef = useRef();
  let lastNameRef = useRef();
  let emailRef = useRef();
  let passwordRef = useRef();

  const appCtx = useContext(AppContext);
  const { setIsLoading, setUsers, usersCollection } = appCtx;

  let history = useHistory();

  const resetInputs = () => {
    firstNameRef.current.value = "";
    lastNameRef.current.value = "";
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      emailRef.current.value.trim() === "" ||
      passwordRef.current.value.trim() === ""
    ) {
      mySwal.fire({
        icon: "warning",
        title: <p>Please fill out all fields</p>,
        customClass: {
          container: "alert-modal",
        },
      });
      return;
    }
    setIsLoading(true);
    auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((userCredentials) => {
        const newUser = {
          id: userCredentials.user.uid,
          firstName: firstNameRef.current.value,
          lastName: lastNameRef.current.value,
          email: emailRef.current.value,
          dateCreated: firebase.firestore.FieldValue.serverTimestamp(),
        };
        resetInputs();
        sendData(setIsLoading, usersCollection, newUser, setUsers);
        history.push("/settings");
      })
      .catch((err) => {
        setIsLoading(false);
        mySwal.fire({
          title: "Something went wrong!",
          text: `${err.message}`,
          icon: "error",
          customClass: { container: "alert-modal" },
        });
      });
  };

  return (
    <form onSubmit={submitHandler} className={styles.AddUserForm}>
      <h2>Add User</h2>
      <section>
        <label>
          First Name:
          <input name="first-name" type="text" ref={firstNameRef} />
        </label>
        <label>
          Last Name:
          <input name="last-name" type="text" ref={lastNameRef} />
        </label>
      </section>
      <section>
        <label>
          Email:
          <input name="email" type="email" ref={emailRef} />
        </label>
        <label>
          Password:
          <input name="password" type="password" ref={passwordRef} />
        </label>
        <button className={styles.AddUserBtn}>Add</button>
      </section>
    </form>
  );
};

export default AddUserForm;
